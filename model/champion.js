const moment = require("moment");
const validator = require("validator");
const AbstractModel = require("./abstract");
const crypto = require("crypto");
const util = require("../utils/util");
const CustomErrors = require("../utils/customErrors");
const CustomError = CustomErrors.CustomError;
const pg = require('pg');
const base64 = require('base64topdf');
const client = new pg.Client(process.env.POSTGRES);
const con = process.env.IS_LOCAL ? client : client;

if (con.connect()) {
  console.log("SUCCESS");
} else {
  console.log("Failed");
}
class championModel extends AbstractModel {
    constructor(params = {}) {
        super();
        this.id = params.id;
        this.name = params.name;
        this.attackDamage = params.attackDamage;
    }
    /**
     * convert to JSON
     */
    toJSON() {
        const clone = { ...this };
        return clone;
    }
    /**
     * create champion
     */

    static async create(params) {
        const id = super.generateId();
        const name = params.name;
        const attackDamage = params.attackDamage;
        const itemParams = {
          id: id,
          name: name,
          attackDamage: attackDamage,
        }
        
        const championList = `INSERT INTO champions(id, name, attackDamage ) VALUES ('${id}','${name}', '${attackDamage}')`;
        const result =  con.query(championList);
        if (result) {
          console.log("INSERT SUCCESSFULY");
        } else {
          console.log("INSERTING FAIL");
        }
        return this.toModel(itemParams);
    }
    /**
     * Acquire one plan with ID.
     */
    static async getById(championId) {
        const item = await this._getById(championId);
        return this.toModel(item);
    }

    /**
     * Acquire one plan with ID.
     * @param {string} championId
     * @return {Object|null}
     */
    static async _getById(championId) {
        var res = await con.query(`SELECT *
        FROM champions     
        WHERE id ='${championId}'`);
    return res.rows[0];
    }

    /**
     * get all champion
     * @return {Array.<Object>}
     */
    static async getAll() {
        const items = await championModel._getAll();
        const models = items.map(item => {
            return this.toModel(item);
        });
        return models;
    }

    /**
     * get all champions
     */
    static async _getAll() {
       const res = await con.query(`select * from champions`);

        return res.rows;
    }

    /**
     * update champion
     * @param {Object}
     * @return {Object}
     */
    static async update(params) {
        const id = params.championId;
        const name = params.name;
        const attackDamage = params.attackDamage;
        const itemParams = {
          id: id,
          name: name,
          attackDamage: attackDamage,
        }
        const queyr_str = `UPDATE champions SET name='${name}', type='${attackDamage}'
        WHERE id = '${id}'`;
        const result = con.query(queyr_str);
        if (result) {
        console.log("UPDATE SUCCESSFULY");
        } else {
        console.log("UPDATING FAIL");
        }
        return this.toModel(itemParams);
    }

    /**
     *delete champion
     * @param {string} userId
     * @param {string} planIds
     * @return {championModel}
     */
    static async delete(championId) {
        var res = await con.query(`DELETE from champions WHERE id='${championId}'`);
    return new championModel(res);
    }

    /**
     * 
     * @param {Object} item
     * @return {championModel|null}
     */
    static toModel(item) {
        if (!item) return null;

        const params = {
            id: item.id !== undefined ? item.id : null,
            name: item.name !== undefined ? item.name : null,
            attackDamage: item.type !== undefined ? item.type : null,
        };
        
        return new championModel(params);
    }
}


module.exports = championModel;
