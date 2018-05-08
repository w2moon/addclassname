const gulp = require('gulp');
const path = require('path');
const addclassname = require('../src/index');
describe('addclassname', () => {
    it("class name add",(done)=>{
        let file = path.join(__dirname,'data','test.js');
        gulp.src(
            file,{buffer:false}
        ).pipe(addclassname()).pipe(gulp.dest("ttt"));
    });
});