// Special character array for password generation
const specialCharacters = [
  '!',
  '#',
  '$',
  '%',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  ':',
  ';',
  '<',
  '=',
  '>',
  '?',
  '@',
  '[',
  '\\',
  ']',
  '^',
  '_',
  '`',
  '{',
  '|',
  '}',
  '~'
];

// Numeric character array for password generation
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Lowercase character array for password generation
const lowercaseCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// Uppercase character array for password generation
const uppercaseCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

//Runs consecutive prompts to determine user's password preferences
function choosePasswordOptions() {
  //Prompts user to input desired password length and stores input as variable
  const userLength = prompt('How many characters would you like your password to have?');
  //Converts user input to number value using base 10
  const length = parseInt(userLength, 10);
  
  //Gives error alert if password is less than 8 characters. Ends prompts
  if (length < 8) {
    alert('Error: Password length must be greater than 7 characters');
    return null;
  };

  //Gives error alert if password is greater than 128 characters. Ends prompts
  if (length > 128) {
    alert('Error: Password length must be less than 129 characters');
    return null;
  };

  //Gives error alert if user gives non-numeric input. Ends prompts
  if (Number.isNaN(length)){
    alert('Error: Password length must be given as a number')
    return null;
  };

  //Stores boolean of user's desire to include special characters
  const hasSpecialCharacters = confirm('Click OK to have password include special characters');

  //Stores boolean of user's desire to include numeric characters
  const hasNumericCharacters = confirm('Click OK to have password include numeric characters');

  //Stores boolean of user's desire to include lowercase characters
  const hasLowercaseCharacters = confirm('Click OK to have password include lowercase characters');

  //Stores boolean of user's desire to include uppercase characters
  const hasUppercaseCharacters = confirm('Click OK to have password include uppercase characters');

  //Gives error alert if all character booleans return false. Ends prompts
  if (
    hasSpecialCharacters === false &&
    hasNumericCharacters === false &&
    hasLowercaseCharacters === false &&
    hasUppercaseCharacters === false
    ) {
      alert('Password must have at least one type of character');
      return null;
    };

  //Stores user's password parameters as object for use outside of function
  const passwordOptions = {
    length: length,
    hasSpecialCharacters: hasSpecialCharacters,
    hasNumericCharacters: hasNumericCharacters,
    hasLowercaseCharacters: hasLowercaseCharacters,
    hasUppercaseCharacters: hasUppercaseCharacters
  };
  
  return passwordOptions;
};

//Generates password using user inputted specifications 
function generatePassword() {
  
  //Stores user inputs as variable that is usable within function
  const options = choosePasswordOptions();

  //Creates alterable array for password generation
  let genPass = [];
  
  //Creates alterable array for allowed characters in password
  let allowedCharacters = [];

  //Creates alterable array for required characters in password
  let requiredCharacters = [];

  //Returns random array index for use in password generation
  function random(array) {
    const randNum = Math.floor(Math.random() * array.length);
    const randSelection = array[randNum];
    return randSelection;
  };

  //Adds specialCharacters array to allowed characters if user desires special characters in password
  //Adds a single, random index from specialCharacters array to required portion of password
  if (options.hasSpecialCharacters === true) {
    allowedCharacters = allowedCharacters.concat(specialCharacters);
    requiredCharacters.push(random(specialCharacters));
  };

  //Adds numericCharacters array to allowed characters if user desires numeric characters in password
  //Adds a single, random index from numericCharacters array to required portion of password
  if (options.hasNumericCharacters === true) {
    allowedCharacters = allowedCharacters.concat(numericCharacters);
    requiredCharacters.push(random(numericCharacters));
  };

  //Adds lowercaseCharacters array to allowed characters if user desires lowercase characters in password
  //Adds a single, random index from lowercaseCharacters array to required portion of password
  if (options.hasLowercaseCharacters === true) {
    allowedCharacters = allowedCharacters.concat(lowercaseCharacters);
    requiredCharacters.push(random(lowercaseCharacters));
  };

  //Adds uppercaseCharacters array to allowed characters if user desires uppercase characters in password
  //Adds a single, random index from uppercaseCharacters array to required portion of password
  if (options.hasUppercaseCharacters === true) {
    allowedCharacters = allowedCharacters.concat(uppercaseCharacters);
    requiredCharacters.push(random(uppercaseCharacters));
  };

  //Adds characters from 'allowed' array to generated password until password equals user's desired length
  for (let i = 0; i < options.length; i++) {
    let characterOption = random(allowedCharacters);

    genPass.push(characterOption);
  };

  //Alters first characters in generated password to equal one character from each 'required' array
  for (let i = 0; i < requiredCharacters.length; i++) {
    genPass[i] = requiredCharacters[i];
  };

  //Changes generated password to string and allows use outside of function
  return genPass.join('');
};

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
