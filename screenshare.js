import * as webdriver from 'selenium-webdriver';
import 'chromedriver';
import pkg from 'selenium-webdriver/chrome.js';
const chrome = pkg;
const { until, By, Key } = webdriver;



import 'dotenv/config';
const botEmail = process.env.bot_email;
const botPassword = process.env.bot_password;

const testVoiceChannel = {
    guild: {
        id: "737170481219895420"
    },
    id: "737170481928732705"
}

const chrome_options = new chrome.Options();
chrome_options.addArguments(
    '--no-sandbox',
    '--window-size=1920,1080',
    // '--disable-web-security',
    'user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36',
    '--auto-select-desktop-capture-source=Window'
);
chrome_options.prefs = {
    "profile": {
      "content_settings": {
        "exceptions": {
          "media_stream_camera": {
            "https://*,*": {
                "setting": 1
            }
          },
          "media_stream_mic": {
            "https://*,*": {
                "setting": 1
            }
          }
        }
      }
    }
  }
console.log(chrome_options);



const driver = new webdriver.Builder().forBrowser(webdriver.Browser.CHROME).setChromeOptions(chrome_options).build();



const start = async (voiceChannel) => {
    driver.executeScript(`document.querySelector('[data-list-item-id="guildsnav___${voiceChannel.guild.id}"]').click()`);
    driver.executeScript(`document.querySelector('[data-list-item-id="channels___${voiceChannel.id}"]').click()`);
    setTimeout(() => {
        driver.executeScript(`document.querySelector('button[aria-label="Share Your Screen"]').click()`);
    }, 500)


    // clickshare();

    await tab();
}

const clickshare = async () => {
    const actions = driver.actions();
    await actions
        .move({x: 790, y: 280, origin: webdriver.Origin.POINTER})
        .press()
        .perform()
}

const tab = async () => {
    setTimeout(async ()=> {
        console.log("FIRING");
        const actions = driver.actions();
        await actions
            .keyDown(Key.SHIFT)
            .sendKeys(Key.TAB)
            .keyUp(Key.SHIFT)
            .perform();
    },5000)
}


await driver.get('https://discord.com');
const loginButton = await driver.wait(until.elementLocated(By.className('appButton-2_tWQ1')));
await loginButton.click();
const emailInput = await driver.wait(until.elementLocated(By.xpath(`//input[@name="email"]`)));
await emailInput.sendKeys(botEmail + Key.TAB + botPassword + Key.TAB + Key.TAB + Key.ENTER);
setTimeout(()=> {start(testVoiceChannel)},5000)




export { start }