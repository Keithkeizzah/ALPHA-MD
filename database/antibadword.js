const config = require("../set");
const { DataTypes } = require('sequelize');

const AntiBadWordDB = config.DATABASE.define('antibadword', {
    jid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('delete', 'warn', 'remove'),
        defaultValue: 'warn',
        allowNull: false
    },
    wordlist: {
        type: DataTypes.JSON,
        defaultValue: ["badword1", "badword2", "slur"],
        allowNull: false
    }
}, {
    timestamps: false
});

async function initAntiBadWordDB() {
    try {
        await AntiBadWordDB.sync({ alter: true });
        console.log('AntiBadWord table ready');
    } catch (error) {
        console.error('Error initializing AntiBadWord table:', error);
        throw error;
    }
}

async function getAntiBadWordSettings(jid) {
    try {
        const [settings] = await AntiBadWordDB.findOrCreate({
            where: { jid },
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting AntiBadWord settings:', error);
        return { status: 'off', action: 'warn', wordlist: [] };
    }
}

async function updateAntiBadWordSettings(jid, updates) {
    try {
        const settings = await getAntiBadWordSettings(jid);
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating AntiBadWord settings:', error);
        return false;
    }
}

module.exports = {
    initAntiBadWordDB,
    getAntiBadWordSettings,
    updateAntiBadWordSettings,
    AntiBadWordDB
};
