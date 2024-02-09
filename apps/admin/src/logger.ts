class Logger {
  log(message: string) {
    console.log( `${ '\x1b[32m' }[AdminJS]${'\x1b[0m'} - ${this.timeStamp()} - ${ '\x1b[32m' }${message}`, '\x1b[0m');
  }
  warn(message: string) {
    console.log( `${ '\x1b[33m' }[AdminJS]${'\x1b[0m'} - ${this.timeStamp()} - ${ '\x1b[33m' }${message}`, '\x1b[0m');
  }
  error(message: string, error?: any) {
    console.log( `${ '\x1b[31m' }[AdminJS]${'\x1b[0m'} - ${this.timeStamp()} - ${ '\x1b[31m' }${message}`, '\x1b[0m');
    console.log( `${ '\x1b[31m' } ${error}`, '\x1b[0m');
  }
  info(message: string) {
    console.log( `${ '\x1b[36m' }[AdminJS]${'\x1b[0m'} - ${this.timeStamp()} - ${ '\x1b[36m' }${message}`, '\x1b[0m');
  }

  private timeStamp() {
    return (new Date()).toLocaleString('en-US');
  }
}

export const logger = new Logger()
