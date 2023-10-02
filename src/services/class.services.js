import {logger} from '../utils.js'

export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      const items = await this.dao.getAll();
      return items;
    } catch (error) {
      logger.error(error)
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return item;
    } catch (error) {
      logger.error(error)
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj);
      if(!newItem) return false;
      else return newItem;
    } catch (error) {
      logger.error(error)
    }
  };

  update = async (id, obj) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return await this.dao.update(id, obj);
    } catch (error) {
      logger.error(error)
    }
  };

  delete = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return await this.dao.delete(id);
    } catch (error) {
      logger.error(error)
    }
  };
}
