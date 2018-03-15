import data from './data';
let quickSearchTimeout;

export const handleSearch = (searchText) => {
  const reg = new RegExp(searchText.split('').join('\\w*').replace(/\W/, ''), 'i');
  // const that = this;

  // Query api when entering the 3 character
  // Only query api every 0.3ms
  // Append suggestions to div
  // Hide suggestions when input is empty

  quickSearchTimeout = setTimeout(() => {
    clearTimeout(quickSearchTimeout);
    // if (searchText.length <= 2) {
    //   return;
    // }

    return data.filter((word) => {
      if (word.name.match(reg)) {
        console.log('word:', word.name);
        // return word.name;
        // Set state
        this.setState({
          suggestions: word.name
        });
      }
    });

  }, 500);
};
