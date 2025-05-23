const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
const path = require('path');

if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined 
    ? databasePath 
    : process.env.DATABASE_URL;


const config = {
    session: process.env.SESSION_ID || 'ALPHA;;;H4sIAAAAAAAAA61Vy46jRhT9lai2tqZ5Pyy1FMBgY0z7bYOjqFWGAmPzclGA8ciLKNlkn0W2+YsoWUbzIUl+JMLdnRlpJpOOFFZFVXHvOfeec3kL0iwqkIUa0HsLchxVkKB2SZocgR5QyyBAGHSBDwkEPeAadb30k+IuWHBLZcBij1Mm5GjlmXesspISOTntjLXBdsjdg2sX5OUujrzPBFRrWhAmTazlDwcpGF46EzMaO0fN4zodVtcSj9ZX601QrYaze3BtI8IIR2mo53uUIAxjCzVTGOHXwR8YMnJgZ44ZZy4ZZZ25SDvyizrpQHk6mYqHB/ekmmu4HWavg4+P7OpysHejSVYsmKY4J2bD5KvhNBiO8qwyhHRbVJtL/6LUT/CLKEyRb/ooJRFpXl33Tl9ceLu7YWcVTQcGU6tYti2O2xzqubW++KfL5pIZirA4sbPXAZf4DDnWhkpFit1suWWibiHKanoXIHPsj07yQLPzdeZLBvch8Cl+0crxv9S9GYt0LCj5oeFKfSOXLstifauZ1aq2tk1AD/rB5ehUDl65r4M/lnCjbu0CUeHSdZOBfpoLuzuedoLGMfXyeJR5Omwma34TvocPSYk/h7LwqDzMZ+uptpzGIy/vKGd/zvFjph/glQNFi/dmaJDdrczkkO8GEr0cL9Rxuqj0Cz5hywypxZrPj0mkysbgwjriOsm12f2N0RE1pg969LULMAqjgmBIoixt92ShC6BfLZCHEblVF4hlnnHZQLEm8v58LvucVp2LjcE0knqJbGVwWs9XMF/GK3N2D7ogx5mHigL5w6ggGW5sVBQwRAXofXVrVMsZoyQjaBT5oAcYnhN5iRFommO+LN7Ue0gKmOdvUkRAFwQ4S2wEegSXqAtuH3Aqx7CyquuawiqcZuh9WlJ5xqB0TuwzLNcyTJ6SLqMEFQQmOejRIifKkiRKwrX7/+AQFJpmFF1jKIFTeYMVFF5VZUZV+xSrU9y/4ZCvX3dBis7kScZt8Vm6C4IIF2SVlnmcQf9F4y+H0POyMiWLJvW0doEw6H2wjQiJ0rBomZUpxN4+qpDW8gC9AMYF+rvfCCP/hcvzDNMyv5XhyDKE9ZzlQIu9DfRRbXqs9HF54ts1WqZEjqJZnhYpmhHam+1BF6SwDQbeffP4x/c/Pf723eOf3/76+O7HLx7Pj/Zt/fsvP7dH735oi/ZMp83uIwKjuAA9oD10OpQezpLOWKlnrqtrimIpSqu4F/ovrnqSrRMsYbKbcxNl2QTrRI5SiGqC2Nom3lo9qQfGXqBk5WZ76lNBQA9Ep7o++DN96eXn0lssqqnyQLbcJlH21dZLT06IKWRv+w+zonpg+MzQRCOUO7DDPTjCKnZVa+tWe8umDlI8081wPNLNfn3fZvNRFXnow2SLuTNY1aO9rPCFqsxtzF/42hbiGcFFdTDJspTskaGbrGCqxqk/LpjStqvNxQovrnjQ7uq5e06gL025ikaDjXzqmIpaP/n9Nm/i5zkfPVsxur0GEbqNzecO/Wujn4C3eqSu3Q9iPA/if/qxrlmKyRMK9UNdSult5eZMWowdIvXHjjGDoSsf9DSPB5bpg2trjDyGJMhwAnoApj7ObjLCWdkK3EyD7DPJNMU0NeWJeQwLorw3zSd8KIpPt6Y4y4ew2IMeYOfylpVbBzRKni8IJC8eBEr7DHcTcP0Low0vuq0IAAA=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Keith",
    NUMERO_OWNER: process.env.NUMERO_OWNER || "254743995989",     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',    
    URL: process.env.URL || "https://files.catbox.moe/6hd2t7.jpg",                         
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'no',     
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by alpha',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',  
    ANTICALL_MSG: process.env.ANTICALL_MSG || 'call declined',             
    GURL: process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    EVENTS: process.env.EVENTS || "yes",    
    BOT: process.env.BOT_NAME || 'ALPHA_MD',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    DP: process.env.STARTING_BOT_MESSAGE || "yes",
    ADM: process.env.ANTI_DELETE_MESSAGE || 'no',
    
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? new Sequelize({
            dialect: 'sqlite',
            storage: DATABASE_URL,
            logging: false,
        })
        : new Sequelize(DATABASE_URL, {
            dialect: 'postgres',
            ssl: true,
            protocol: 'postgres',
            dialectOptions: {
                native: true,
                ssl: { 
                    require: true, 
                    rejectUnauthorized: false 
                },
            },
            logging: false,
        })
};


let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

module.exports = config;
