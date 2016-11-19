module.exports = {
  convertBase62ToId: (base62) => {
    const chars = base62.split('');
    return chars.reduce((sum, char) => {
      if (/[0-9]/.test(char)) {
        return sum + parseInt(char, 10);
      } else if (/[a-z]/.test(char)) {
        return sum + (char.charCodeAt(0) - 87);
      }
      return sum + (char.charCodeAt(0) - 29);
    }, 0);
  },

  convertIdToBase62: (num) => {
    const base = 62;
    const map = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      .split('');
    let value = num;
    const result = [];

    while (value > 0) {
      result.unshift(value % base);
      value = Math.trunc(value / base);
    }

    return result.map(item => map[item]);
  },
};
