import {FriendDatabase} from '.';

const TABLE_NAME = 'Friend';

export default class FriendTable {
  createTable() {
    //return this.apiClient.get(intl, 'masters/getallgenders');
    return new Promise((resolve, reject) => {
      FriendDatabase.transaction(function (txn) {
        txn.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='${TABLE_NAME}'`,
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql(`DROP TABLE IF EXISTS ${TABLE_NAME}`, []);
              txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} 
                    (fid INTEGER PRIMARY KEY AUTOINCREMENT, 
                    Id INTEGER, 
                    Name TEXT, 
                    First_Name__c TEXT, 
                    Last_Name__c TEXT, 
                    Age__c INTEGER, 
                    attributes TEXT, 
                    updatedOn TEXT, 
                    createdOn TEXT)
                `,
                [],
              );
              resolve(true);
            }
          },
        );
      });
    });
  }

  insert(friendRow = []) {
    return new Promise((resolve, reject) => {
      FriendDatabase.transaction(function (tx) {
        let count = 0;
        friendRow.forEach(friend => {
          tx.executeSql(
            `INSERT INTO ${TABLE_NAME} (Id, Name, First_Name__c, Last_Name__c, Age__c, attributes, updatedOn, createdOn) VALUES (?,?,?,?,?,?,?,?)`,
            [
              friend.Id || '',
              friend.Name,
              friend.First_Name__c,
              friend.Last_Name__c,
              friend.Age__c,
              JSON.stringify(friend.attributes),
              `${new Date().getTime()}`,
              `${new Date().getTime()}`,
            ],
            (tx, results) => {
              console.log(
                'Results',
                results,
                'rowsAffected',
                results.rowsAffected,
              );
              count++;
              if (count === friendRow.length) {
                resolve(results);
              }
            },
          );
        });
      });
    });
  }

  update(friendRow = []) {
    return new Promise((resolve, reject) => {
      FriendDatabase.transaction(function (tx) {
        let count = 0;
        friendRow.forEach(friend => {
          tx.executeSql(
            `UPDATE ${TABLE_NAME} set Id=?, Name=?, First_Name__c=?, Last_Name__c=?, Age__c=?, attributes=?, updatedOn=? WHERE fid=?`,
            [
              friend.Id || '',
              friend.Name,
              friend.First_Name__c,
              friend.Last_Name__c,
              friend.Age__c,
              JSON.stringify(friend.attributes),
              `${new Date().getTime()}`,
              friend.fid,
            ],
            (tx, results) => {
              console.log(
                'Results',
                results,
                'rowsAffected',
                results.rowsAffected,
              );
              count++;
              if (count === friendRow.length) {
                resolve(results);
              }
            },
          );
        });
      });
    });
  }

  async get() {
    return new Promise((resolve, reject) => {
      FriendDatabase.transaction(tx => {
        tx.executeSql(`SELECT * FROM ${TABLE_NAME}`, [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            const friends = [];
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              friends.push({
                ...row,
                attributes: row.attributes && JSON.parse(row.attributes),
              });
            }
            resolve(friends);
            return;
          } else {
            resolve([]);
          }
        });
      });
    });
  }

  async getOfflineSaveRecord() {
    return new Promise((resolve, reject) => {
      FriendDatabase.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${TABLE_NAME} where Id=?`,
          [''],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              const friends = [];
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                friends.push({
                  //...row,
                  //attributes: row.attributes && JSON.parse(row.attributes),
                  First_Name__c: row.First_Name__c,
                  Last_Name__c: row.Last_Name__c,
                  Age__c: row.Age__c,
                  fid: row.fid,
                });
              }
              resolve(friends);
              return;
            } else {
              resolve([]);
            }
          },
        );
      });
    });
  }
}
