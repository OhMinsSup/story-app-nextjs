import React from 'react';
import {
  AppShell,
  Button,
  Container,
  Group,
  PasswordInput,
  Radio,
  RadioGroup,
  Text,
  Title,
} from '@mantine/core';

interface NavigationTopbarProps {
  title?: string;
}

const NavigationTopbar: React.FC<NavigationTopbarProps> = ({ title }) => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0">
        <Title order={1}>{title}</Title>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" /> */}
            Edit
          </button>
        </span>

        <span className="hidden sm:block ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" /> */}
            View
          </button>
        </span>

        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> */}
            Publish
          </button>
        </span>
      </div>
    </div>
  );
};

export default NavigationTopbar;
