import React from 'react';

export default function Loading() {
  return (
    <div className="flex space-x-2 p-5 rounded-full justify-center items-center">
      <div class="bg-skin-button-accent p-2 w-4 h-4 rounded-full animate-bounce"></div>
      <div class="bg-skin-button-accent p-2 w-4 h-4 rounded-full animate-bounce"></div>
      <div class="bg-skin-button-accent p-2 w-4 h-4 rounded-full animate-bounce"></div>
    </div>
  );
}
