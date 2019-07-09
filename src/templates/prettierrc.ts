const prettierrc = {
  singleQuote: true,
  jsxBracketSameLine: true
};

export default {
  name: '.prettierrc',
  content: JSON.stringify(prettierrc, null, 2)
};
