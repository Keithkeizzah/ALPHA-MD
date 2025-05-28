const config = require("../set");
const { DataTypes } = require('sequelize');

const AutoLikeDB = config.DATABASE.define('autolike', {
    status: {
        type: DataTypes.ENUM('on', 'off'),
        defaultValue: 'on',
        allowNull: false
    },
    throttle_delay: {
        type: DataTypes.INTEGER,
        defaultValue: 5000, // 5 seconds
        allowNull: false
    },
    reaction_delay: {
        type: DataTypes.INTEGER,
        defaultValue: 2000, // 2 seconds
        allowNull: false
    },
    emojis: {
        type: DataTypes.JSON,
        defaultValue: ["❤️", "💖", "💘", "💝", "💓", "💌", "💕", "😎", "🔥", "💥", "💯", "✨", "🌟", "🌈", "⚡", "💎", "🌀", "👑", "🎉", "🎊", "🦄", "👽", "🛸", "🚀", "🦋", "💫", "🍀", "🎶", "🎧", "🎸", "🎤", "🏆", "🏅", "🌍", "🌎", "🌏", "🎮", "🎲", "💪", "🏋️", "🥇", "👟", "🏃", "🚴", "🚶", "🏄", "⛷️", "🕶️", "🧳", "🍿", "🥂", "🍻", "🍷", "🍸", "🥃", "🍾", "🎯", "⏳", "🎁", "🎈", "🎨", "🌻", "🌸", "🌺", "🌹", "🌼", "🌞", "🌝", "🌜", "🌙", "🌚", "🍀", "🌱", "🍃", "🍂", "🌾", "🐉", "🐍", "🦓", "🦄", "🦋", "🦧", "🦘", "🦨", "🦡", "🐅", "🐆", "🐓", "🐢", "🐊", "🐠", "🐟", "🐡", "🦑", "🐙", "🦀", "🐬", "🦕", "🦖", "🐾", "🐕", "🐈", "🐇"],
        allowNull: false
    }
}, {
    timestamps: false
});

async function initAutoLikeDB() {
    try {
        await AutoLikeDB.sync({ alter: true });
        console.log('AutoLike table ready');
    } catch (error) {
        console.error('Error initializing AutoLike table:', error);
        throw error;
    }
}

async function getAutoLikeSettings() {
    try {
        const [settings] = await AutoLikeDB.findOrCreate({
            where: {},
            defaults: {}
        });
        return settings;
    } catch (error) {
        console.error('Error getting AutoLike settings:', error);
        return { status: 'off', throttle_delay: 5000, reaction_delay: 2000, emojis: ["❤️", "🔥", "👍"] };
    }
}

async function updateAutoLikeSettings(updates) {
    try {
        const settings = await getAutoLikeSettings();
        return await settings.update(updates);
    } catch (error) {
        console.error('Error updating AutoLike settings:', error);
        return null;
    }
}

module.exports = {
    initAutoLikeDB,
    getAutoLikeSettings,
    updateAutoLikeSettings,
    AutoLikeDB
};
