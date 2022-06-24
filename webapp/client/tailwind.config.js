function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          inverted: withOpacity('--color-text-inverted'),
          muted: withOpacity('--color-text-muted'),
        },
      },
      backgroundColor: {
        skin: {
          base: withOpacity('--color-fill-base'),
          inverted: withOpacity('--color-fill-inverted'),
          'button-accent': withOpacity('--color-button-accent'),
          'button-accent-hover': withOpacity('--color-button-accent-hover'),
          'button-muted': withOpacity('--color-button-muted'),
        },
      },
    },
  },
  plugins: [],
};
