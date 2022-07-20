import puppeteer from 'puppeteer';
import 'dotenv/config';
const botEmail = process.env.bot_email;
const botPassword = process.env.bot_password;

const testVoiceChannel = {
    guild: {
        id: "737170481219895420"
    },
    id: "737170481928732705"
}

const browser = await puppeteer.launch({
    headless:false,
    args: [
        // '--auto-select-desktop-capture-source=Doublelift',
        // '--use-fake-ui-for-media-stream'
    ]
    // ignoreDefaultArgs: [
    //     '--mute-audio',
    // ],
    // args: [
    //     '--window-size=1920,1080',
    // ],
    // defaultViewport: null
});

// browser.on('targetcreated', target => {
//     console.log(target.page());
// })

const [page] = await browser.pages();
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

const start = async (voiceChannel) => {
    const [page] = await browser.pages();
    await page.waitForSelector(`[data-list-item-id="guildsnav___${voiceChannel.guild.id}"]`);
    await page.click(`[data-list-item-id="guildsnav___${voiceChannel.guild.id}"]`);
    await page.waitForSelector(`[data-list-item-id="channels___${voiceChannel.id}"]`);
    await page.click(`[data-list-item-id="channels___${voiceChannel.id}"]`);
    await page.waitForSelector('[aria-label="Share Your Screen"]');
    await page.click('[aria-label="Share Your Screen"]');
    
    setTimeout(async()=>{
        console.log("Firing")
        // await page.keyboard.down('ShiftLeft');
        // await page.keyboard.press('Tab');
        // await page.keyboard.up('ShiftLeft');
        // await page.keyboard.sendCharacter('Enter');
        // page.mouse.click(620, 100, { button: 'left'})
        page.mouse.click(640, 200, { button: 'left'});
    },1000)

}


await page.goto('https://discord.com');
const loginButton = await page.waitForSelector('.button-ZGMevK');
loginButton.evaluate(b => b.click());
setTimeout(async ()=>{
    if(page.url !== 'https://discord.com/channels/@me') {

        await page.waitForSelector('input[name=email].inputDefault-3FGxgL');
        await page.type('input[name=email].inputDefault-3FGxgL', botEmail);
        await page.type('input[name=password].inputDefault-3FGxgL', botPassword);
        await page.click('.button-1cRKG6');

        setTimeout(()=> {start(testVoiceChannel)},5000)
    }
},500);




export { start }