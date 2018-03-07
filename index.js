const types = require('babel-types');

module.exports = () => ({
  visitor: {
    ImportDeclaration: path => {
      // Reference: https://github.com/babel/babel/tree/master/packages/babel-types#importdeclaration
      if (path.node.source.value !== 'seek-style-guide/react') {
        return;
      }

      const specifiers = path.node.specifiers;
      const fullImports = specifiers.filter(specifier => specifier.type !== 'ImportSpecifier');
      const memberImports = specifiers.filter(specifier => specifier.type === 'ImportSpecifier');

      if (fullImports.length > 0 || memberImports.length === 0) {
        throw new Error('babel-plugin-seek-style-guide: import of entire seek-style-guide package not allowed');
      }

      const transforms = memberImports.map(memberImport => {
        const name = memberImport.imported.name;

        const newIdentifier = types.identifier(memberImport.local.name);
        const newImportSpecifier = types.importDefaultSpecifier(newIdentifier);
        const newModulePath = types.stringLiteral(`seek-style-guide/react/${name}/${name}`);
        const newImportDeclaration = types.importDeclaration([newImportSpecifier], newModulePath);

        return newImportDeclaration;
      });

      path.replaceWithMultiple(transforms);
    }
  }
});
