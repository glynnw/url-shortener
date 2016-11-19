module.exports = {
  convertBase62ToId: function(base62) {
    let chars = base62.split('');
    return chars.reduce(function(sum, char) {
      if (/[0-9]/.test(char))
        return sum += parseInt(char);
      else if (/[a-z]/.test(char))
        return sum += char.charCodeAt(0) - 87;
      else
        return sum += char.charCodeAt(0) - 29;
    }, 0);
  },

  convertIdToBase62: function(num) {
    let base = 62;
    let map = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      .split('');
    let value = num;
    let result = [];

    while (value > 0) {
      result.unshift(value % base);
      value = Math.trunc(value / base);
    }

    return result.map(function(item) {
      return map[item];
    });
  }
}
