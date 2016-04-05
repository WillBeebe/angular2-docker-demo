export class Config {
  static instance: Config;
  static isCreating: Boolean = false;
  conf: string;

  constructor() {
    if (!Config.isCreating) {
        throw new Error('You can\'t call new in Singleton instances!');
    }
    this.conf = require('config_file');
  }

  static getInstance() {
        if (Config.instance == null) {
            Config.isCreating = true;
            Config.instance = new Config();
            Config.isCreating = false;
        }

        return Config.instance;
    }

  getConfig() {
    return this.conf;
  }

  getApiHost() {
    return this.conf['api_host'];
  }

  getApiPort() {
    return this.conf['api_port'];
  }

  getApiURL() {
    return this.getApiHost() + ':' + this.getApiPort();
  }
}

