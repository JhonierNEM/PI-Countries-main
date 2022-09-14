const { DataTypes } = require('sequelize');
module.exports = (sequelize)=>{
    sequelize.define('activity',{
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name:{
            type: DataTypes.STRING,
        },
        difficulty:{
            type: DataTypes.INTEGER,
        },
        duration:{
            type: DataTypes.STRING,
        },
        season:{
            type: DataTypes.ENUM(
                'summer',
                'autumn',
                'winter',
                'spring'
            ),
        },
    },{
        timesTamps:true,
        createdAt: false,
        updatedAt: 'updateTime'
      })
}