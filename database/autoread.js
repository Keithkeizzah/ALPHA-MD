const config = require("../set");
const { DataTypes } = require('sequelize');

const AutoReadDB = config.DATABASE.define('autoread', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'off',
        allowNull: false
    }
}, {
    timestamps: false
});

async function initAutoReadDB() {
    try {
        await AutoReadDB.sync({ alter: true });
        console.log('AutoRead table ready');
    } catch (error) {
        console.error('Error initializing AutoRead table:', error);
        throw error;
    }
}

async function getAutoReadStatus() {
    try {
        const [settings] = await AutoReadDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings.status;
    } catch (error) {
        console.error('Error getting autoread status:', error);
        return 'on'; // Default fallback
    }
}

async function setAutoReadStatus(newStatus) {
    try {
        const [settings] = await AutoReadDB.findOrCreate({
            where: {},
            defaults: {}
        });
        await settings.update({ status: newStatus });
        return true;
    } catch (error) {
        console.error('Error updating autoread status:', error);
        return false;
    }
}

module.exports = {
    initAutoReadDB,
    getAutoReadStatus,
    setAutoReadStatus,
    AutoReadDB
};
