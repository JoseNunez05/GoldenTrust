var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
var numbers = "1234567890"

function createRandomName(length)
{
    var random_string = '';
    for(let i=0; i<length; i++)
    {
        random_string += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return random_string;
}

console.log(createRandomName(5));