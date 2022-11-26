import {InferSchemaType, Schema, model } from 'mongoose';

const solutionSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    challenge: {
      type: Schema.Types.ObjectId,
      required: true 
    },
    resource: Schema.Types.Buffer,
});


type ISolution = InferSchemaType<typeof solutionSchema>;

export const Solution = model<ISolution>("Solution", solutionSchema); 
