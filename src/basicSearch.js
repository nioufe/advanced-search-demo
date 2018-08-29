// unoptimized search
export default function(logs = [], syntaxTree = []) {
  const matches = [];
  logs.forEach(log => {
    let isLogMatching = true;
    syntaxTree.forEach(attribute => {
      if (!attribute.values.includes(log[attribute.key])) {
        isLogMatching = false;
      }
    });
    if (isLogMatching) {
      matches.push(log);
    }
  });
  return matches;
}
