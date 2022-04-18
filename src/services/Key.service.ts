class KeyService {
  public static generateKey(length = 20): string {
    const keys = {
      upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowerCase: 'abcdefghijklmnopqrstuvwxyz',
      number: '0123456789',
      symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };
    const getKey = [
      function upperCase() {
        return keys.upperCase[
          Math.floor(Math.random() * keys.upperCase.length)
        ];
      },
      function lowerCase() {
        return keys.lowerCase[
          Math.floor(Math.random() * keys.lowerCase.length)
        ];
      },
      function number() {
        return keys.number[Math.floor(Math.random() * keys.number.length)];
      },
      function symbol() {
        return keys.symbol[Math.floor(Math.random() * keys.symbol.length)];
      },
    ];

    let password = '';
    while (length > password.length) {
      password += getKey[Math.floor(Math.random() * getKey.length)]();
    }

    return password;
  }
}

export default KeyService;
