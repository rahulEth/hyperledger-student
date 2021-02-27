/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

const _CREATESTUDENT = "CREATESTUDENT"
const _MARKSUPDATE= "MARKSUPDATE"

class Student extends Contract {

    async createStudent(ctx, rollnumber, name, timestamp) {
        if(rollNumber.length == 0){
            throw new Error(`roll Number can not be zero length`)
        }
        if(name.length == 0){
            throw new Error(`name can not be zero length`)
        }
        if(timestamp.length == 0){
            throw new Error(`timestamp can not be zero length`)
        }
        console.info('============= START : Create Student ===========');

        const student = {
            rollnumber,
            docType: 'student',
            name,
            marks : "0",
            timestamp
        };

        await ctx.stub.putState(rollnumber, Buffer.from(JSON.stringify(student)));
        console.info('============= END : Create Student ===========');
        const txid = ctx.stub.getTxID()
        const obj = {'txid' : txid, 'student' : student}
        ctx.stub.setEvent(_CREATESTUDENT, obj)
        return JSON.stringify(obj)
    }

    async queryStudentByRoleNumber(ctx, rollNumber) {
        if(rollNumber.length == 0){
            throw new Error(`roll Number can not be zero length`)
        }

        studentAsByte = await ctx.stub.getState(rollNumber)
        if(!studentAsByte){
            throw new Error(`roll number ${rollNumber} does not exist`)
        }
        console.log(".........", studentAsByte.toString())
        return JSON.stringify(studentAsByte.toString())
    }

    async marksUpdate(ctx, rollNumber, marks) {
        if(rollNumber.length == 0){
            throw new Error(`roll Number can not be zero length`)
        }
        if(marks.length == 0){
            throw new Error(`marks can not be zero length`)
        }
        console.info('============= START : marksUpdate ===========');

        const studentAsBytes = await ctx.stub.getState(rollNumber); // get the car from chaincode state
        if (!studentAsBytes || studentAsBytes.length === 0) {
            throw new Error(`${rollNumber} does not exist`);
        }
        const student = JSON.parse(studentAsBytes.toString());
        student.marks = marks;
        console.log("student......", student)
        await ctx.stub.putState(rollNumber, Buffer.from(JSON.stringify(student)));
        console.info('============= END : marksUpdate ===========');
        const  txid = ctx.stub.getTxID()
        const obj = {'txid' : txid, 'newOwner' : newOwner}
        ctx.stub.setEvent(_MARKSUPDATE, obj)
        return json.stringify(obj)
    }

}

module.exports = Student;
