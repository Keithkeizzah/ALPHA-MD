const config = require("../set");
const { DataTypes } = require('sequelize');

const AntiLinkDB = config.DATABASE.define('antilink', {
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
        defaultValue: 'delete',
        allowNull: false
    }
}, {
    timestamps: false
});

async function initAntiLinkDB() {
    try {
        await AntiLinkDB.sync({ alter: true });
        console.log('AntiLink table ready');
    } catch (error) {
        console.error('Error initializing AntiLink table:', error);
        throw error;
    }
}

async function getAntiLinkSettings(jid) {
    try {
        const [settings] = await AntiLinkDB.findOrCreate({
            where: { jid },
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting AntiLink settings:', error);
        return { status: 'off', action: 'delete' };
    }
}

async function updateAntiLinkSettings(jid, updates) {
    try {
        const settings = await getAntiLinkSettings(jid);
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating AntiLink settings:', error);
        return null;
    }
}

module.exports = {
    initAntiLinkDB,
    getAntiLinkSettings,
    updateAntiLinkSettings,
    AntiLinkDB
};
