export const transliterate = (input: string, camelCase: boolean = false, lowercase: boolean = true) => {
  input = input || '';

  let output: string;

  const transliteratedText = input
    .replace(/іє/g, 'ie') // Exception
    .replace(/Іє/g, 'Ie') // Exception
    .replace(/ія/g, 'ia') // Exception
    .replace(/Ія/g, 'Ia') // Exception
    .replace(/зг/g, 'zgh') // Exception
    .replace(/Зг/g, 'Zgh') // Exception
    .replace(/ьо/g, 'io') // Exception
    .replace(/щ/g, 'shch')
    .replace(/Щ/g, 'Shch')
    .replace(/а/g, 'a')
    .replace(/б/g, 'b')
    .replace(/в/g, 'v')
    .replace(/г/g, 'h')
    .replace(/ґ/g, 'g')
    .replace(/д/g, 'd')
    .replace(/е/g, 'e')
    .replace(/(^|[-_\s])є/g, '$1ye')
    .replace(/є/g, 'ie')
    .replace(/ж/g, 'zh')
    .replace(/з/g, 'z')
    .replace(/и/g, 'y')
    .replace(/і/g, 'i')
    .replace(/(^|[-_\s])ї/g, '$1yi')
    .replace(/ї/g, 'i')
    .replace(/(^|[-_\s])й/g, '$1y')
    .replace(/й/g, 'i')
    .replace(/к/g, 'k')
    .replace(/л/g, 'l')
    .replace(/м/g, 'm')
    .replace(/н/g, 'n')
    .replace(/о/g, 'o')
    .replace(/п/g, 'p')
    .replace(/р/g, 'r')
    .replace(/с/g, 's')
    .replace(/т/g, 't')
    .replace(/у/g, 'u')
    .replace(/ф/g, 'f')
    .replace(/х/g, 'kh')
    .replace(/ц/g, 'ts')
    .replace(/ч/g, 'ch')
    .replace(/ш/g, 'sh')
    .replace(/ь/g, '')
    .replace(/(^|[-_\s])ю/g, '$1yu')
    .replace(/ю/g, 'iu')
    .replace(/(^|[-_\s])я/g, '$1ya')
    .replace(/я/g, 'ia')
    .replace(/А/g, 'A')
    .replace(/Б/g, 'B')
    .replace(/В/g, 'V')
    .replace(/Г/g, 'H')
    .replace(/Ґ/g, 'G')
    .replace(/Д/g, 'D')
    .replace(/Е/g, 'E')
    .replace(/(^|[-_\s])Є/g, '$1Ye')
    .replace(/Є/g, 'Ie')
    .replace(/Ж/g, 'Zh')
    .replace(/З/g, 'Z')
    .replace(/И/g, 'Y')
    .replace(/І/g, 'I')
    .replace(/(^|[-_\s])Ї/g, '$1Yi')
    .replace(/Ї/g, 'I')
    .replace(/(^|[-_\s])Й/g, '$1Y')
    .replace(/Й/g, 'I')
    .replace(/К/g, 'K')
    .replace(/Л/g, 'L')
    .replace(/М/g, 'M')
    .replace(/Н/g, 'N')
    .replace(/О/g, 'O')
    .replace(/П/g, 'P')
    .replace(/Р/g, 'R')
    .replace(/С/g, 'S')
    .replace(/Т/g, 'T')
    .replace(/У/g, 'U')
    .replace(/Ф/g, 'F')
    .replace(/Х/g, 'Kh')
    .replace(/Ц/g, 'Ts')
    .replace(/Ч/g, 'Ch')
    .replace(/Ш/g, 'Sh')
    .replace(/Ь/g, '')
    .replace(/(^|[-_\s])Ю/g, '$1Yu')
    .replace(/Ю/g, 'Iu')
    .replace(/(^|[-_\s])Я/g, '$1Ya')
    .replace(/Я/g, 'Ia')
    .replace(/'/g, '')
    .replace(/\u2019/g, '');

  if (camelCase) {
    return transliteratedText
      .toLowerCase()
      .split(' ')
      .map((word, i) => {
        if (i === 0) {
          return word;
        }
        const uppercaseLetter = word.charAt(0).toUpperCase();
        const rest = word.slice(1);
        return `${uppercaseLetter}${rest}`;
      })
      .join('');
  }

  output = transliteratedText
    .replace(/ /g, '-') // kebab-case
    .replace(/[()]/g, ''); // strip parentheses from slugs

  if (lowercase) {
    output = output.toLowerCase();
  }

  return output;
};
