module.exports = {
  type: 'react-app',
  webpack: {
    styles: {
      css: [
        // Create a rule which provides the specific setup react-toolbox v2 needs
        {
          include: /react-toolbox/,
          // css-loader options
          css: {
            modules: true,
            localIdentName: "[name]--[local]--[hash:base64:8]",
            sourceMap: true
          }
        },
        // Create a catch-all rule for other CSS
        {
          exclude: /react-toolbox/
        }
      ]
    }
  }
}
