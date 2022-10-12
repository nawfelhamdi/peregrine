#Replicates PAA calculations performed by Moody's RI V8.0 
#Version 5 (fixes bugs)
### CONFIGURATION
from multiprocessing.pool import RUN
#from this import d
import pandas as pd
import numpy as np
import os
import dateutil
from datetime import datetime
from dateutil import relativedelta
import webbrowser
import time


### TO-DO:
# Integrate explicit currency and date selection with Peregrine (most clients use only 1 currency anyways)
# Implement queue and loops to calculate for all groups
# Include interest (discount) rate calculations for PAA_INTEREST_ACCRETION


#currency/group selector
currency = 'KYD'
group = 'BAF_CAY_Morb_Medsafe_2020_Remaining'

#execution time tracking
start_time = time.time()



pd.set_option('display.max_columns', None)


### DATA INGESTION

# create dataframes with the calculation template, variable values, and run numbers/steps
project_dir = os.path.dirname(__file__)
main = pd.read_csv(os.path.join(project_dir, 'template.csv'), index_col=False)
varAllRuns = pd.read_csv(os.path.join(project_dir, 'variable_all_runs.csv'), index_col=False)
run = pd.read_csv(os.path.join(project_dir, 'run.csv'), index_col=False)

# dictionary with step code as key, run number as value 
runDict = dict(zip(run.calc_step_code, run.run_number))
runDictErrorSet = set()
#print(runDict)
#exit()

# populate run numbers in main with dictionary
for row in main.itertuples():
    try:
        main.at[row.Index, "run_number"] = runDict[main.at[row.Index, "run_step"]]
    except KeyError:
        runDictErrorSet.add("ERROR: Run # not provided for step " + str(main.at[row.Index, "run_step"]) + ", continuing")
        continue
#print(runDictErrorSet)
#main.to_csv('demo.csv', index=False)


# dictionary with run number as key, group code as name
groupDict = dict(zip(varAllRuns.run_number, varAllRuns.ifrs_group_code))
# implementing underlying group definition to be built: latest variable with given run number currently overwrites all others with same run numbers 
#underlyingGroupDict = dict(zip(varAllRuns.run_number, varAllRuns.underlying_ifrs_group_code))
groupDictErrorSet = set()


# populate run numbers in main with dictionary
for row in main.itertuples():
    try:
        main.at[row.Index, "ifrs_17_group"] = groupDict[main.at[row.Index, "run_number"]]
        #main.at[row.Index, "underlying_group"] = underlyingGroupDict[main.at[row.Index, "run_number"]]
    except KeyError:
        #groupDictErrorSet.add("ERROR: Group code not provided for run number " + str(main.at[row.Index, "run_number"]) + ", continuing")
        continue
#print(groupDictErrorSet)


varAllRuns.insert(2, "run_step", None)

#create dictionary that aligns run numbers with their corresponding step code 
runDict = dict(zip(run.run_number, run.calc_step_code))

#print(runDict)
#exit()

#populate the run step column of varAllRuns using dictionary
for row in varAllRuns.itertuples():
    try:
        varAllRuns.at[row.Index, "run_step"] = runDict[varAllRuns.at[row.Index, "run_number"]]
    except KeyError:
        #print("ERROR: Key " + str(varAllRuns.at[row.Index, "run_number"]) + " not found, continuing")
        continue

#print(varAllRuns)


#get list of periods from the column names in varAllRuns
dateList = []
for col in varAllRuns.columns:
    if col[0] == '2':
        dateList.append(str(col))
        # tuple: 1st is value, 2nd is whether or not it is direct input
        main[str(col)] = 0

for index, row in varAllRuns.iterrows():
    for date in dateList:
        if row['transaction_currency_code'] == currency and row['ifrs_group_code'] == group:
            #account for typos that would otherwise render a number a string
            if type(row[date]) == str:
                row[date] = row[date].strip()
                row[date] = row[date].replace(',', '')
                row[date] = float(row[date])

            if not np.isnan(row[date]):
                print(row[date])
                main.loc[(main['run_number'] == row['run_number']) & (main['variable'] == row['variable_name']), date] = row[date]
            #print(row[date])




            #main.loc[(main['run_number'] == row['run_number'] and main['variable'] == row['variable_name']), date] = row[date]


# Interest rate calculations
interestRateTemplate = {'Type': ['PnL', 'Discount']}
interestRates = pd.DataFrame(interestRateTemplate)

### NOTE: FILENAMES WILL DIFFER IN ACTUAL RUNS (currently unknown and assumed)
# create dataframes with pnl and discount rates
pnl = pd.read_csv('ifrs_group_pnl_rates.csv', index_col=False)
discount = pd.read_csv('ifrs_group_discount_rates.csv', index_col=False)

#TIME PERIOD = MONTH (hardcoded)

# Find time period
d1 = datetime.strptime(dateList[0], "%Y-%m-%d")
d2 = datetime.strptime(dateList[1], "%Y-%m-%d")
delta = relativedelta.relativedelta(d2, d1)
if delta.months + (delta.years * 12) == 0:
    period = 'Year'
    print('A')
elif delta.months + (delta.years * 12) == 3:
    period = 'Quarter'
    print('B')
else:
    period = 'Month'
    print('C')


for date in dateList:
    tmp = []
    #discount rates
    if discount.loc[(discount['run_number'] == list(runDict.keys())[list(runDict.values()).index('LIC_INTEREST_ACCRETION')]) & (discount['ifrs_group_code'] == group) & (discount['currency_code'] == currency) & (discount['time_period'] == period)].empty:
        tmp.append(0)
    else:
        tmp.append(discount.loc[(discount['run_number'] == list(runDict.keys())[list(runDict.values()).index('LIC_INTEREST_ACCRETION')]) & (discount['ifrs_group_code'] == group) & (discount['currency_code'] == currency) & (discount['time_period'] == period)].iloc[0])

    #pnl rates
    if pnl.loc[(pnl['run_number'] == list(runDict.keys())[list(runDict.values()).index('PAA_INTEREST_ACCRETION')]) & (pnl['ifrs_group_code'] == group) & (pnl['currency_code'] == currency) & (pnl['time_period'] == period)].empty:
        tmp.append(0)
    else:
        tmp.append(pnl.loc[(pnl['run_number'] == list(runDict.keys())[list(runDict.values()).index('PAA_INTEREST_ACCRETION')]) & (pnl['ifrs_group_code'] == group) & (pnl['currency_code'] == currency) & (pnl['time_period'] == period)].iloc[0])
    
    interestRates[date] = tmp



### CALCULATIONS; all line numbers refer to line in Excel file titled PAA_LOGIC --> change documentation to somthing unique and static

#########################################################################################################################################
current_step = 'LIC_OPENING_CURRENT'
#########################################################################################################################################

#15
for index, date in enumerate(dateList):
    if date != dateList[0] and date != dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[index-1]].iloc[0]

#52
for index, date in enumerate(dateList):
    if index > 1:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[index-1]].iloc[0]

#53 
if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[0]].iloc[0] == 0:

    #if this variable is not explicitly defined, calculate...
    if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'LIC') & (varAllRuns['ifrs_group_code'] == group), dateList[0]].empty:

        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[0]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[0]].iloc[0]

#########################################################################################################################################
current_step = 'LIC_CHANGE_IN_DR_SOP'
#########################################################################################################################################

#56
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[index-1]].iloc[0]

#67
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[index-1]].iloc[0]

#124
if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[0]].iloc[0] == 0:

    #if this variable is not explicitly defined, calculate...
    if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'LIC') & (varAllRuns['ifrs_group_code'] == group), dateList[0]].empty:

        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[0]] = main.loc[(main['run_step'] == 'LIC_OPENING_CURRENT') & (main['variable'] == 'LIC'), dateList[0]].iloc[0]

#125
for index, date in enumerate(dateList):
    if index > 1:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[index-1]].iloc[0]

#########################################################################################################################################
current_step = 'LIC_NC_RECOGNITION'
#########################################################################################################################################

#128
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_ACT_BEL'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_ACT_BEL'), dateList[index-1]].iloc[0]

#133
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_VAR_ACT_BEL'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_VAR_ACT_BEL'), dateList[index-1]].iloc[0]

#137
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_VAR_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_ACT'), date].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_DR_SOP') & (main['variable'] == 'BEL_B_LIC'), date].iloc[0]

#146
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), date].iloc[0]

#156
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CUSTOM_OTHER_ACT_RA'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_VAR_ACT_BEL'), dateList[0]].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_DR_SOP') & (main['variable'] == 'BEL_E_LIC'), dateList[0]].iloc[0]

#195
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), dateList[0]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[0]].iloc[0]

#########################################################################################################################################
current_step = 'LIC_NC_TO_IF'
#########################################################################################################################################

#Line 197
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[0]] = main.loc[(main['run_step'] == 'LIC_NC_RECOGNITION') & (main['variable'] == 'BEL_B_LIC'), dateList[0]].iloc[0] + main.loc[(main['run_step'] == 'LIC_OPENING_CURRENT') & (main['variable'] == 'BEL_B_LIC'), dateList[0]].iloc[0]
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[index-1]].iloc[0]

#Line 206
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), date].iloc[0]

#Line 208 
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_B_LIC_EOP'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_NC_RECOGNITION') & (main['variable'] == 'CF_BEL_B_LIC_EOP'), dateList[-1]].iloc[0]

#Line 226
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_E_LIC_EOP'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_NC_RECOGNITION') & (main['variable'] == 'CF_BEL_E_LIC_EOP'), dateList[-1]].iloc[0]

#Line 234
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[0]] = main.loc[(main['run_step'] == 'LIC_OPENING_CURRENT') & (main['variable'] == 'RA_LIC'), dateList[0]].iloc[0]
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[index-1]].iloc[0]

#Line 235
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date].iloc[0]

#########################################################################################################################################
current_step = 'LIC_INTEREST_ACCRETION'
#########################################################################################################################################

#Line 240
for index, date in enumerate(dateList):
    if date == dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_B_LIC_EOP_SUM'), dateList[0]] = main.loc[(main['run_step'] == 'LIC_OPENING_CURRENT') & (main['variable'] == 'CF_BEL_B_LIC_EOP'), dateList[0]].iloc[0]
    else:
        if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_B_LIC_EOP_SUM'), date].iloc[0] == 0:

            #if this variable is not explicitly defined, calculate...
            if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'CF_BEL_B_LIC_EOP_SUM') & (varAllRuns['ifrs_group_code'] == group), date].empty:

                main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_B_LIC_EOP_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_B_LIC_EOP_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_B_LIC_EOP'), date].iloc[0]

#293:
for index, date in enumerate(dateList):
    if index == 0:
         main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_E_LIC_EOP_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_E_LIC_EOP'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_E_LIC_EOP_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_E_LIC_EOP_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_E_LIC_EOP'), date].iloc[0]


#Line 241
for index, date in enumerate(dateList):
    if date == dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC_SUM'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC'), dateList[0]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC'), date].iloc[0]

#Line 242
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC_SUM'), date].iloc[0]

#Line 243
for index, date in enumerate(dateList):
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), date] = main.loc[(main['run_step'] == 'LIC_NC_TO_IF') & (main['variable'] == 'BEL_B_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), date].iloc[0]

#***Line 244 for variable IBEL_B_LIC to be coded; see comment in Excel cell
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC'), date] = main.loc[(main['run_step'] == 'LIC_CHANGE_IN_DR_SOP') & (main['variable'] == 'BEL_B_LIC'), date].iloc[0] * interestRates.loc[(interestRates['Type'] == 'PnL'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC'), date] = (main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), date].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_B_LIC_EOP_SUM'), date].iloc[0]) * interestRates.loc[(interestRates['Type'] == 'PnL'), date].iloc[0]

#####TO-DO: IMPLEMENT INTEREST RATE CALCULATIONS

#Line 250
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), date] = main.loc[(main['run_step'] == 'LIC_NC_RECOGNITION') & (main['variable'] == 'B_VAR_ACT_BEL'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), date].iloc[0]

#***Line 251 for variable IBEL_E_LIC to becoded 
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC'), date] = main.loc[(main['run_step'] == 'LIC_CHANGE_IN_DR_SOP') & (main['variable'] == 'BEL_E_LIC'), date].iloc[0] * interestRates.loc[(interestRates['Type'] == 'PnL'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC'), date] = (main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), date].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_BEL_E_LIC_EOP_SUM'), date].iloc[0]) * interestRates.loc[(interestRates['Type'] == 'PnL'), date].iloc[0]


#Line 252 
for index, date in enumerate(dateList):
    if index == 0:
         main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC'), date].iloc[0]

#Line 253
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC_SUM'), date].iloc[0]

#Line 254
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), date].iloc[0]

#Line 311
for index, date in enumerate(dateList):
    if date == dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_RA_LIC_EOP_SUM'), dateList[0]] = main.loc[(main['run_step'] == 'LIC_OPENING_CURRENT') & (main['variable'] == 'CF_RA_LIC_EOP'), dateList[0]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_RA_LIC_EOP_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_RA_LIC_EOP_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_RA_LIC_EOP'), date].iloc[0]

#Line 321
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), date].iloc[0]

#Line 322
for index, date in enumerate(dateList):
    if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date].iloc[0] == 0:

            #if this variable is not explicitly defined, calculate...
            if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'RA_LIC') & (varAllRuns['ifrs_group_code'] == group), date].empty:


                main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date] = main.loc[(main['run_step'] == 'LIC_NC_TO_IF') & (main['variable'] == 'RA_LIC'), dateList[index-1]].iloc[0] 

#Line 323
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date].iloc[0] - main.loc[(main['run_step'] == 'LIC_NC_TO_IF') & (main['variable'] == 'RA_LIC'), date].iloc[0]

#Line 324
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), date].iloc[0]

#Line 326
for index, date in enumerate(dateList):
    if date == dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC_SUM'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC'), dateList[index-1]].iloc[0] 
    else: 
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC'), date].iloc[0]

#Line 349
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC'), date].iloc[0]
    
    elif main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC'), date].iloc[0] == 0:
        
        #if this variable is not explicitly defined, calculate...
        if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'IBEL_LIC') & (varAllRuns['ifrs_group_code'] == group), date].empty:
            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC'), date].iloc[0]

#Line 350
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC_SUM'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC'), dateList[0]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC'), date].iloc[0]

#Line 351 and 352
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_B_LIC_SUM'), date].iloc[0]
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_E_LIC_SUM'), date].iloc[0]

#***Line 353 for variable IRA_LIC to be coded once PNL rates are incorporated
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC'), date] = main.loc[(main['run_step'] == 'LIC_NC_TO_IF') & (main['variable'] == 'RA_LIC'), date].iloc[0] * interestRates.loc[(interestRates['Type'] == 'PnL'), date].iloc[0]
    else:
        if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'IRA_LIC') & (varAllRuns['ifrs_group_code'] == group), date].empty:
            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC'), date] = (main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[index-1]].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_RA_LIC_EOP_SUM'), dateList[index-1]].iloc[0]) * interestRates.loc[(interestRates['Type'] == 'PnL'), date].iloc[0]


#Line 354
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ILIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC'), date].iloc[0]
    elif main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ILIC'), date].iloc[0] == 0:
        #if this variable is not explicitly defined, calculate...
        if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'IBEL_LIC') & (varAllRuns['ifrs_group_code'] == group), date].empty:
            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ILIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IBEL_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC'), date].iloc[0]

#Line 355
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ILIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ILIC'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ILIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ILIC_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ILIC'), date].iloc[0]

#Line 356
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IRA_LIC'), date].iloc[0]

#Line 357
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), date].iloc[0]

#########################################################################################################################################
current_step = 'LIC_FCF_RELEASE'
#########################################################################################################################################

#Line 360
for index, date in enumerate(dateList):
    if date == dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST'), dateList[0]] = main.loc[(main['run_step'] == 'LIC_OPENING_CURRENT') & (main['variable'] == 'CF_BEL_B_LIC_EOP'), dateList[0]].iloc[0]
    else:
        if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST'), date].iloc[0] == 0:
            #if this variable is not explicitly defined, calculate...
            if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'EXP_B_PAID_PAST') & (varAllRuns['ifrs_group_code'] == group), date].empty:

                main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST'), date] = main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'CF_BEL_B_LIC_EOP'), date].iloc[0]

#Line 362
for index, date in enumerate(dateList):
    if date == dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST_SUM'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST'), dateList[0]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_CUR'), date].iloc[0]

#Line 363 
for index, date in enumerate(dateList):
    if date == dateList[0] or date == dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), date] = -main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST_SUM'), date].iloc[0]
    
#Line 364 
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), date] = main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'BEL_B_LIC'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), date].iloc[0]

#Line 370
for index, date in enumerate(dateList):
    if date == dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), date] = main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'BEL_E_LIC'), date].iloc[0] - main.loc[(main['run_step'] == 'LIC_NC_TO_IF') & (main['variable'] == 'CF_BEL_E_LIC_EOP'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), date] = main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'BEL_E_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), date].iloc[0]

#Line 373
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST'), dateList[0]] = main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'CF_BEL_B_LIC_EOP'), dateList[0]].iloc[0]
    else:
        if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST'), date].iloc[0] == 0:

            #if this variable is not explicitly defined, calculate...
            if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'EXP_E_PAID_PAST') & (varAllRuns['ifrs_group_code'] == group), date].empty:


                main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST'), date] = main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'CF_BEL_B_LIC_EOP'), date].iloc[0]

#Line 374
for index, date in enumerate(dateList):
    if date == dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST_SUM'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST'), dateList[0]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_CUR'), date].iloc[0]

#Line 375
for index, date in enumerate(dateList):
    if date == dateList[0] or date == dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), date] = -main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST_SUM'), date].iloc[0]

#Line 378
for index, date in enumerate(dateList):
    if date == dateList[0] or date == dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), date].iloc[0] 

#Line 379
for index, date in enumerate(dateList):
    if index > 0:
        #try:
            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), date] = main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'BEL_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), date].iloc[0]
        #except IndexError:
            #main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), date] = 0

#407:
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'CF_RA_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE'), date].iloc[0]

#418
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), date].iloc[0]

#419
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), date] = -main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE_SUM'), date].iloc[0]

#444
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_PAID_PAST'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_E_PAID_PAST'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_B_PAID_PAST'), date].iloc[0]

#445
for date in dateList:
    if date == dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE'), date] = main.loc[(main['run_step'] == 'LIC_OPENING_CURRENT') & (main['variable'] == 'CF_RA_LIC_EOP'), date].iloc[0]
    else:
        if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE'), date].iloc[0] == 0:
            #if this variable is not explicitly defined, calculate...
            if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'EXP_RA_LIC_RELEASE') & (varAllRuns['ifrs_group_code'] == group), date].empty:
                main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE'), date] = main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'CF_RA_LIC_EOP'), date].iloc[0]

#447 --> RESUME ALICE
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'EXP_RA_LIC_RELEASE'), date].iloc[0]

#448
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LIC'), date].iloc[0] + main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'LIC'), dateList[index-1]].iloc[0]

#449
for index, date in enumerate(dateList):
    if index > 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), date].iloc[0] + main.loc[(main['run_step'] == 'LIC_INTEREST_ACCRETION') & (main['variable'] == 'RA_LIC'), dateList[index-1]].iloc[0]

#########################################################################################################################################
current_step = 'LIC_CF_VARIANCE'
#########################################################################################################################################

#451
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_CUR'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_PAST'), date].iloc[0]

#452
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_CUR_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_CUR'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_CUR_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_CUR_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_CUR'), date].iloc[0]

#453
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_B_PAID_PAST'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_PAST'), date].iloc[0] - main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'EXP_B_PAID_PAST'), date].iloc[0]

#454
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_E_PAID_PAST'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_PAST'), date].iloc[0] - main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'EXP_E_PAID_PAST'), date].iloc[0]

#455
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_PAID_PAST'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_B_PAID_PAST'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_E_PAID_PAST'), date].iloc[0]

#456
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_CUR'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_PAST'), date].iloc[0]

#457
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_CUR_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_CUR'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_CUR_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_CUR_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_CUR'), date].iloc[0]

#458
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'PAID_PAST'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'E_PAID_PAST'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'B_PAID_PAST'), date].iloc[0]

#########################################################################################################################################
current_step = 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP'
#########################################################################################################################################

#545
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0]

#546
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'DELTA_BEL_E_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), dateList[-1]].iloc[0]

#547
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0]

#548
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), dateList[-1]].iloc[0]

#549
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'RA_LIC'), dateList[-1]].iloc[0]

#550
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), dateList[-1]].iloc[0]

#551
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[-1]] = -main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LIC'), dateList[-1]].iloc[0]

#########################################################################################################################################
current_step = 'LIC_CHANGE_IN_RNP'
#########################################################################################################################################

#570
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0]

#571
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), dateList[-1]] = -main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'DELTA_BEL_LIC'), dateList[-1]].iloc[0]

#572
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0]

#573
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'BEL_LIC'), dateList[-1]].iloc[0]


#574
#if this variable is not explicitly defined, calculate...
if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'LIC') & (varAllRuns['ifrs_group_code'] == group), dateList[-1]].empty:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[-1]] = -main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'DELTA_LIC'), dateList[-1]].iloc[0]

#575
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'LIC'), dateList[-1]].iloc[0]

#########################################################################################################################################
current_step = 'LIC_CHANGE_IN_ESTIMATES_FINANCIAL_RISK_EOP'
#########################################################################################################################################

#594
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == 'LIC_CHANGE_IN_RNP') & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0]

#601
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_RNP') & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0]

#604
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_E_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_B_LIC'), dateList[-1]].iloc[0]

#606
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'RA_LIC'), dateList[-1]].iloc[0]

#607
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_BEL_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_RA_LIC'), dateList[-1]].iloc[0]

#608
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'DELTA_LIC'), dateList[-1]].iloc[0]

#612
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'DELTA_BEL_LIC'), dateList[-1]].iloc[0]

#########################################################################################################################################
current_step = 'PAA_CHANGE_IN_DR_EOP'
#########################################################################################################################################

#Line 618
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0]

#Line 624
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0]

#Line 627
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0]

#Line 658
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_PS_ISE_EOP') & (main['variable'] == 'RA_LIC'), dateList[-1]].iloc[0]

#Line 659
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[-1]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[-1]].iloc[0]

#########################################################################################################################################
current_step = 'LIC_CLOSING_CURRENT'
#########################################################################################################################################

#661
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_B_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'BEL_B_LIC'), dateList[-1]].iloc[0]

#662
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_E_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'DELTA_BEL_E_LIC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_FINANCIAL_RISK_EOP') & (main['variable'] == 'BEL_E_LIC'), dateList[-1]].iloc[0]

#663
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'BEL_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_FINANCIAL_RISK_EOP') & (main['variable'] == 'BEL_LIC'), dateList[-1]].iloc[0]

#664
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_CHANGE_IN_ESTIMATES_FINANCIAL_RISK_EOP') & (main['variable'] == 'LIC'), dateList[-1]].iloc[0]

#665
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_LIC'), dateList[-1]] = main.loc[(main['run_step'] == 'LIC_FCF_RELEASE') & (main['variable'] == 'RA_LIC'), dateList[-1]].iloc[0]


















#START OF LRC: 
#########################################################################################################################################
current_step = 'PAA_OPENING_CURRENT'
#########################################################################################################################################

#Line 2
if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[0]].iloc[0] == 0:

    #if this variable is not explicitly defined, calculate...
    if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'LIC') & (varAllRuns['ifrs_group_code'] == group), dateList[0]].empty:

        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[0]] = main.loc[(main['run_step'] == 'LIC_OPENING_CURRENT') & (main['variable'] == 'LIC'), dateList[0]].iloc[0]

#Line 3
for index, date in enumerate(dateList):
    if date != dateList[0] and date != dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), dateList[index-1]].iloc[0]

#Line 4
for index, date in enumerate(dateList):
    if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date].iloc[0] == 0:

        #if this variable is not explicitly defined, calculate...
        if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'LRC') & (varAllRuns['ifrs_group_code'] == group), date].empty:

            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date].iloc[0]

#Line 5 
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ICV'), dateList[0]] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), dateList[0]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), dateList[0]].iloc[0]

#Line 8
for index, date in enumerate(dateList):
    if date != dateList[0] and date != dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_LC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_LC'), dateList[index-1]].iloc[0]

#Line 9
for index, date in enumerate(dateList):
    if date != dateList[0] and date != dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_LC_FX_IMPACT'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_LC_FX_IMPACT'), dateList[index-1]].iloc[0]
 
#Line 10
for index, date in enumerate(dateList):
    if date != dateList[0] and date != dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LC'), dateList[index-1]].iloc[0]
 
#Line 11
for index, date in enumerate(dateList):
    if date != dateList[0] and date != dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LRECC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LRECC'), dateList[index-1]].iloc[0]

#LRC_P: intermediate steps are blank
for index, date in enumerate(dateList):
    if date != dateList[0] and date != dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date] = 0

#########################################################################################################################################
current_step = 'PAA_CHANGE_IN_DR_SOP'
#########################################################################################################################################

#if this variable is not explicitly defined, calculate...
#Line 18
if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'LRC') & (varAllRuns['ifrs_group_code'] == group), date].empty:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), dateList[0]] = main.loc[(main['run_step'] == 'PAA_OPENING_CURRENT') & (main['variable'] == 'LRC'), dateList[0]].iloc[0]

#########################################################################################################################################
current_step = 'PAA_NB_RECOGNITION'
#########################################################################################################################################

#intentially empty here

#########################################################################################################################################
current_step = 'PAA_NB_TO_IF'
#########################################################################################################################################

#Line 46
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date] = main.loc[(main['run_step'] == 'PAA_OPENING_CURRENT') & (main['variable'] == 'LRC_P'), dateList[0]].iloc[0] + main.loc[(main['run_step'] == 'PAA_NB_RECOGNITION') & (main['variable'] == 'LRC_P'), dateList[0]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), dateList[index-1]].iloc[0]
     

#Line 50
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date] = main.loc[(main['run_step'] == 'PAA_OPENING_CURRENT') & (main['variable'] == 'LRC'), dateList[0]].iloc[0] + main.loc[(main['run_step'] == 'PAA_NB_RECOGNITION') & (main['variable'] == 'LRC'), dateList[0]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), dateList[index-1]].iloc[0]

#########################################################################################################################################
current_step = 'PAA_INTEREST_ACCRETION' 
#########################################################################################################################################

# ALL ARE CURRENTLY CONSTANT -- INTEREST RATE TABLE TO BE GENERATED AND FACTORS INCLUDED

#Line 68
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date] = main.loc[(main['run_step'] == 'PAA_NB_RECOGNITION') & (main['variable'] == 'LRC'), dateList[1]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date] = main.loc[(main['run_step'] == 'PAA_NB_TO_IF') & (main['variable'] == 'LRC'), date].iloc[0] * (1 + interestRates.loc[(interestRates['Type'] == 'Discount'), date].iloc[0])

#Line 69
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), date] = main.loc[(main['run_step'] == 'PAA_NB_RECOGNITION') & (main['variable'] == 'LRC_AQE'), dateList[1]].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), date] = main.loc[(main['run_step'] == 'PAA_NB_RECOGNITION') & (main['variable'] == 'LRC_AQE'), date].iloc[0] * (1 + interestRates.loc[(interestRates['Type'] == 'Discount'), date].iloc[0])

#Line 70
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_LC'), date] = main.loc[(main['run_step'] == 'PAA_OPENING_CURRENT') & (main['variable'] == 'LRC_LC'), date].iloc[0] * (1 + interestRates.loc[(interestRates['Type'] == 'Discount'), date].iloc[0])

#Line 71
for index, date in enumerate(dateList):
    if index == 0:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date] = main.loc[(main['run_step'] == 'PAA_NB_RECOGNITION') & (main['variable'] == 'LRC_P'), dateList[1]].iloc[0] 
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date] = main.loc[(main['run_step'] == 'PAA_NB_TO_IF') & (main['variable'] == 'LRC_P'), date].iloc[0] * (1 + interestRates.loc[(interestRates['Type'] == 'Discount'), date].iloc[0])


#########################################################################################################################################
current_step = 'PAA_FCF_RELEASE'
#########################################################################################################################################

#Line 71
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date] = main.loc[(main['run_step'] == 'PAA_INTEREST_ACCRETION') & (main['variable'] == 'LRC'), date].iloc[0] 

#########################################################################################################################################
current_step = 'PAA_CF_VARIANCE'
#########################################################################################################################################

#Line 85 
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'AQE_PAID_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'AQE_PAID_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'AQE_PAID'), date].iloc[0] 

#Line 87 
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'P_PAID_FUT_SUM'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'P_PAID_FUT_SUM'), dateList[index-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'P_PAID_FUT'), date].iloc[0] 

#Line 88
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date] = main.loc[(main['run_step'] == 'PAA_INTEREST_ACCRETION') & (main['variable'] == 'LRC_P'), date].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'P_PAID_FUT_SUM'), date].iloc[0] 

#Line 89
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'AQE_PAID_SUM'), date].iloc[0] 

#Line 90
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), date] = -main.loc[(main['run_step'] == current_step) & (main['variable'] == 'AQE_PAID_SUM'), date].iloc[0]

#Line 91
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_AQE'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), date].iloc[0] 

#Line 92
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_P'), date] = -main.loc[(main['run_step'] == current_step) & (main['variable'] == 'P_PAID_FUT_SUM'), date].iloc[0] 

#Line 93
for index, date in enumerate(dateList):
    if date != dateList[0]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_P'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_AQE'), date].iloc[0] 

#########################################################################################################################################
current_step = 'PAA_AMORTIZATION'
#########################################################################################################################################

#Line 96
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'D_AQE'), date] = main.loc[(main['run_step'] == 'PAA_NB_RECOGNITION') & (main['variable'] == 'AQE_CF_SUM'), date].iloc[0] 

#Line 98
# ISSUE: DO NOT directly input though values exist in variable_all_runs
# TEMP SOLUTION: overwrite intemediate values with 0
for index, date in enumerate(dateList):
    if date == dateList[0] or date == dateList[-1]:

        #if this variable is not explicitly defined, calculate...
        if varAllRuns.loc[(varAllRuns['run_step'] == current_step ) & (varAllRuns['variable_name'] == 'A_AQE') & (varAllRuns['ifrs_group_code'] == group), date].empty:
            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'A_AQE'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'D_AQE'), date].iloc[0] * main.loc[(main['run_step'] == current_step) & (main['variable'] == 'A_AQE_PERCENT'), date].iloc[0] 
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'A_AQE'), date] = 0

#Line 102
for index, date in enumerate(dateList):
        if date != dateList[0] and date != dateList[-1]:
            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'AMORTIZED_EP'), date] = 0

#Line 103
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_AQE'), dateList[-1]] = -main.loc[(main['run_step'] == current_step) & (main['variable'] == 'A_AQE'), dateList[-1]].iloc[0]

#Line 104
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), dateList[-1]] = main.loc[(main['run_step'] == 'PAA_CF_VARIANCE') & (main['variable'] == 'LRC_AQE'), dateList[1]].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_AQE'), dateList[-1]].iloc[0]

#Line 106
for index, date in enumerate(dateList):
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_P'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'IC_ACT'), date].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'AMORTIZED_EP'), date].iloc[0]

#Line 109
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), dateList[-1]] = main.loc[(main['run_step'] == 'PAA_CF_VARIANCE') & (main['variable'] == 'LRC'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'A_AQE'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'AMORTIZED_EP'), dateList[-1]].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), dateList[-1]].iloc[0]

#Line 110
for index, date in enumerate(dateList):
    if date == dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), dateList[-1]] = main.loc[(main['run_step'] == 'PAA_CF_VARIANCE') & (main['variable'] == 'LRC_P'), dateList[-1]].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_P'), dateList[-1]].iloc[0] 

#########################################################################################################################################
current_step = 'PAA_CHANGE_IN_ESTIMATES_FS'
#########################################################################################################################################

#line 115
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date] = main.loc[(main['run_step'] == 'PAA_AMORTIZATION') & (main['variable'] == 'LRC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC'), date].iloc[0]

#line 116 
for index, date in enumerate(dateList):
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'RA_GMM'), date].iloc[0]

#line 119
for index, date in enumerate(dateList):
    if date != dateList[-1]:
         main.loc[(main['run_step'] == current_step) & (main['variable'] == 'PAA_LRECC_REVERSAL'), date] = main.loc[(main['run_step'] == 'PAA_AMORTIZATION') & (main['variable'] == 'DELTA_LRC_P'), date].iloc[0]
    else:
         main.loc[(main['run_step'] == current_step) & (main['variable'] == 'PAA_LRECC_REVERSAL'), date] = main.loc[(main['run_step'] == 'PAA_AMORTIZATION') & (main['variable'] == 'LRC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date].iloc[0]

#line 120
for index, date in enumerate(dateList):
    if date != dateList[-1]:
         main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_LRECC_INTERIM'), date] = main.loc[(main['run_step'] == 'PAA_AMORTIZATION') & (main['variable'] == 'FUT_SER'), date].iloc[0]

#line 121
for index, date in enumerate(dateList):
    if date != dateList[-1]:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LRECC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LC'), date].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'PAA_LRECC_REVERSAL'), date].iloc[0]
    else:
        if main.loc[(main['run_step'] == current_step) & (main['variable'] == 'DELTA_LRC_LRECC'), date].iloc[0] == 0:
            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LRECC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LC'), date].iloc[0] - main.loc[(main['run_step'] == current_step) & (main['variable'] == 'PAA_LRECC_REVERSAL'), date].iloc[0] 
        else:
            main.loc[(main['run_step'] == current_step) & (main['variable'] == 'FLAG_LRECC'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_LRECC_INTERIM'), date].iloc[0]

#########################################################################################################################################
current_step = 'PAA_CHANGE_IN_DR_EOP'
#########################################################################################################################################

#Line 126
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), dateList[-1]] = main.loc[(main['run_step'] == 'PAA_CHANGE_IN_ESTIMATES_FS') & (main['variable'] == 'LRC'), dateList[-1]].iloc[0]

#########################################################################################################################################
current_step = 'PAA_CLOSING_CURRENT'
#########################################################################################################################################

#line 134
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), date] = main.loc[(main['run_step'] == 'LIC_CLOSING_CURRENT') & (main['variable'] == 'LIC'), date].iloc[0]

#line 135
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), dateList[0]] = main.loc[(main['run_step'] == 'PAA_CHANGE_IN_ESTIMATES_FS') & (main['variable'] == 'PAA_LRECC_REVERSAL'), dateList[0]].iloc[0]
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), dateList[-1]] = main.loc[(main['run_step'] == 'PAA_CHANGE_IN_DR_EOP') & (main['variable'] == 'LRC'), dateList[-1]].iloc[0]

#line 136
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'ICV'), date] = main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LIC'), date].iloc[0] + main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC'), date].iloc[0]

#line 137
for date in dateList:
    main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_AQE'), date] = main.loc[(main['run_step'] == 'PAA_AMORTIZATION') & (main['variable'] == 'LRC_AQE'), date].iloc[0]

#line 141
main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_LC'), dateList[-1]] = main.loc[(main['run_step'] == 'PAA_CHANGE_IN_ESTIMATES_FS') & (main['variable'] == 'LRC_LRECC_INTERIM'), dateList[-1]].iloc[0]

#line 142
for date in dateList:
    if(date != dateList[-1]):
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date] = main.loc[(main['run_step'] == 'PAA_AMORTIZATION') & (main['variable'] == 'LRC_P'), date].iloc[0]
    else:
        main.loc[(main['run_step'] == current_step) & (main['variable'] == 'LRC_P'), date] = main.loc[(main['run_step'] == 'PAA_CHANGE_IN_ESTIMATES_FS') & (main['variable'] == 'LRC'), date].iloc[0] - main.loc[(main['run_step'] == 'PAA_AMORTIZATION') & (main['variable'] == 'LRC_AQE'), date].iloc[0]


### DISPLAY RESULTS
main.to_csv('demo.csv', index=False)

webbrowser.open('demo.csv')
#display execution time --> 0.000000001 seconds!
print("--- %s seconds ---" % (time.time() - start_time))
#exit()