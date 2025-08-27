module.exports = {
  // The target to open the source code in
  target: 'vscode', // or 'webstorm', 'atom', 'sublime', etc.
  
  // Enable only in development
  enabled: process.env.NODE_ENV === 'development',
  
  // Custom adapter for different editors
  adapter: {
    // VS Code
    vscode: {
      editor: 'code',
      args: ['--goto', '{file}:{line}:{column}']
    },
    // WebStorm
    webstorm: {
      editor: 'webstorm',
      args: ['--line', '{line}', '{file}']
    },
    // Sublime Text
    sublime: {
      editor: 'subl',
      args: ['{file}:{line}:{column}']
    }
  }
};