import {InferSchemaType, Schema, model } from 'mongoose';

const solutionSchema = new Schema({
    resource: Schema.Types.Buffer,
    challenge: { type: Schema.Types.ObjectId, required: true }
});


type ISolution = InferSchemaType<typeof solutionSchema>;

export const Solution = model<ISolution>("Solution", solutionSchema); 
