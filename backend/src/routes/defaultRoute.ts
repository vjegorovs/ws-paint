import express from "express";
export const defaultRoute: express.Router = express.Router();

defaultRoute.get("/:questionId?", (req, res, next) => {
    console.log(req.params.questionId);
    // const questionId: number = +req.params.questionId || 0;
    // const requestedQuestion: Question = yieldQuestion(questionId);
    res.json({
        message: `Success! You get a nice json response now. You've requested question number ${14}`,
        question: 14,
    });
});