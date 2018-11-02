const db = require("../index.js");
const fs = require('fs');
const deasync = require('deasync');

const _path = "server/database/migrations/";
const _verfile = _path + ".ver";
const _pattern = new RegExp(/^([0-9]{1,2}[.]){2}.*[.]sql$/);

function migrate() {
    var files = fs.readdirSync(_path);
    var cur_ver = ver();
    var oldest = true;

    files.forEach((file) => {
        if (ex = file.match(_pattern)) {
            var new_ver = file.match(/^([0-9]{1,2}[.]){2}/)[0];
            
            if (cur_ver === true || new_ver > cur_ver) {
                data = fs.readFileSync(_path + file, {encoding: 'utf-8'});
                data.split(";").slice(0, -1).forEach((row) => query(row));

                console.log(file + " file applied successful");
                fs.writeFileSync(_verfile, new_ver);
                oldest = false;
            }
        }
    });

    if (oldest) {
        console.log("You have the oldest databese version " + cur_ver)
    }
}

function ver() {
    if (fs.existsSync(_verfile)) {
        return fs.readFileSync(_verfile, {encoding: 'utf-8'});
    }
    else return true;
}

function query(data) {
    var sync = true;
    var attempts = 10;
    db.query(data, (err) => {
        if (err) {
            console.log(err);
            sync = null;
        }
        sync = false;
    });
    
    while(sync === true && attempts--) {
        deasync.sleep(100);
    }

    if (sync === null) return false;
    else if (sync === true) throw new Error("Database not responding");
    else return true;
}

if (module.parent === null) {
    migrate();
    db.end();
    process.exit();
}