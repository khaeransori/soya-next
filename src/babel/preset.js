import { stringified } from '../config/load';

export default {
  presets: [
    require.resolve('next/babel'),
  ],
  plugins: [
    [
      require.resolve('styled-modules/babel'),
      {
        pattern: /\.(css|s(a|c)ss)$/,
      },
    ],
    [
      require.resolve('babel-plugin-transform-define'),
      stringified,
    ],
  ],
};
