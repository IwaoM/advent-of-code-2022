// Class for file system tree elements
class FsNode {
  constructor (name, parent = null, size = 0) {
    this.name = name;
    this.size = size;
    this.childNodes = [];
    this.parentNode = parent;
  }

  childNodeNamesToStr () {
    if (!this.childNodes.length) {
      return "none";
    }
    let list = `[${this.childNodes[0].name}`;
    for (let i = 1; i < this.childNodes.length; i++) {
      list += `, ${this.childNodes[i].name}`;
    }
    list += "]";
    return list;
  }

  appendChildNode (node) {
    this.childNodes.push(node);
  }

  findChildNode (childName) {
    return this.childNodes.find(elem => elem.name === childName);
  }

  computeNodeSize () {
    let finalSize = 0;
    for (let i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i].size) {
        finalSize += this.childNodes[i].size;
      } else {
        finalSize += this.childNodes[i].computeNodeSize();
      }
    }
    this.size = finalSize;
    return finalSize;
  }

  // part 1 function
  computeTotalSizeSumUnderX (maxSize) {
    let finalSize = 0;
    if (this.size <= maxSize) {
      finalSize += this.size;
    }
    for (let i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i].childNodes.length) {
        finalSize += this.childNodes[i].computeTotalSizeSumUnderX(maxSize);
      }
    }
    return finalSize;
  }

  // part 2 function
  getSmallestBiggerFolderSize (minSize) {
    let folderSize = this.size;
    for (let i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i].childNodes.length) {
        const childFolderSize = this.childNodes[i].getSmallestBiggerFolderSize(minSize);
        if (childFolderSize >= minSize && childFolderSize < folderSize) {
          folderSize = childFolderSize;
        }
      }
    }
    return folderSize;
  }

  displayTree (depth = 0) {
    let lineIndent = "";
    if (depth) {
      lineIndent += "|-";
      depth;
    }
    for (let i = 0; i < depth - 1; i++) {
      lineIndent = "| " + lineIndent;
    }
    console.log(`${lineIndent}📁${this.name} [${this.size ? this.size : "?"}]`);
    for (let i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i].childNodes.length) {
        this.childNodes[i].displayTree(depth + 1);
      } else {
        console.log(`${lineIndent ? "| " + lineIndent : "|-"}📄${this.childNodes[i].name} [${this.childNodes[i].size ? this.childNodes[i].size : "nc"}]`);
      }
    }
  }
}

module.exports = function day7 (inputData) {
  const inputArray = inputData.split("\n");
  inputArray.pop(); // remove empty line at EOF

  //* Parsing & tree construction
  const rootNode = new FsNode("/");
  let currentNode;
  for (let i = 0; i < inputArray.length; i++) {
    // console.log(`\n[${i + 1}] ${inputArray[i]}`);
    if (inputArray[i].startsWith("$ cd ")) {

      const cdTo = inputArray[i].slice(5);
      if (cdTo === "/") {
        currentNode = rootNode;
      } else if (cdTo === "..") {
        currentNode = currentNode.parentNode;
      } else {
        currentNode = currentNode.findChildNode(cdTo);
      }
      // console.log(`Changing node to ${cdTo}`);

    } else if (inputArray[i] === "$ ls") {

      // do nothing, this simply means the next lines will be file & folder names, which we can determine without this line
      // console.log(`Reading directory content`);

    } else if (inputArray[i].startsWith("dir ")) { // the line contains a folder name

      const folderName = inputArray[i].slice(4);
      const newNode = new FsNode(folderName, currentNode);
      currentNode.appendChildNode(newNode);
      // console.log(`Creating new folder ${newNode.name} & appending it to ${currentNode.name}`);

    } else { // the line contains a number and a string, which represent the size of a file and its name

      const fileName = inputArray[i].split(" ")[1];
      const fileSize = parseInt(inputArray[i].split(" ")[0]);
      const newNode = new FsNode(fileName, currentNode, fileSize);
      currentNode.appendChildNode(newNode);
      // console.log(`Creating new file ${newNode.name} [${newNode.size}] & appending it to ${currentNode.name}`);

    }
    // console.log(`current: ${currentNode.name} - size: ${currentNode.size} - parent: ${currentNode.parentNode?.name} - children: ${currentNode.childNodeNamesToStr()}`);
  }
  rootNode.computeNodeSize();
  // rootNode.displayTree(); // a nice tree view

  //* Part 1
  let result1 = rootNode.computeTotalSizeSumUnderX(100000);
  console.log(`Sum of the total sizes of directories with a total size of at most 100000: ${result1}`);

  //* Part 2
  const minSpaceToFree = 30000000 - (70000000 - rootNode.size);
  let result2 = rootNode.getSmallestBiggerFolderSize(minSpaceToFree);
  console.log(`Size of the smallest folder that, if deleted, would free up enough space on the filesystem to run the update: ${result2}`);
};

