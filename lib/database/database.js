import knex from 'knex';
import knexConfig from '../../knexfile';

export default class Database {
    constructor(tableName) {
        this.db = knex(knexConfig.development);
        this.tableName = tableName;
    }

    /**
     * Return list of all objects in the table .
     */
    findall() {
        return this.db(this.tableName);
    }

    /**
     * Return the object with the 
     * corresponding id in the table .
     * @param {*} id 
     */
    findone(id) {
        return this.db(this.tableName).where({id: Number(id)});
    }

    /**
     * Add a new object in table  
     * and return the new created object.
     * @param {*} data 
     */
    async create(data) {
        const [id] = await this.db(this.tableName).insert(data);
        
        return this.findone(id);
    }

    /**
     * Update the object with the corresponding 
     * id in the table .
     * @param {*} id 
     * @param {*} data 
     */
    async update(id, data) {
        await this.db(this.tableName)
            .where('id', Number(id))
            .update(data);
        
        return this.findone(id)
    }

    /**
     * Remove the object with the corresponding id the table.
     * @param {*} id 
     */
    delete(id) {
        return this.db(this.tableName)
            .where('id', Number(id))
            .del();
    }

    /**
     * 
     * @param {*} constraint 
     * @param {*} join 
     */
    findJoinWith(constraint, join) {
        return this.db(this.tableName)
            .join(join)
            .select(`${this.tableName}.*`)
            .where(constraint.fk, constraint.value);
    }
}