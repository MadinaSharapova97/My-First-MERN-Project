import { RequestHandler } from "express"
import createHttpError from "http-errors"
import mongoose from "mongoose"
import NoteModel from "../models/note"
import { asserIsDefined } from "../util/assertIsDefind"

export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        asserIsDefined(authenticatedUserId)

        const notes = await NoteModel.find({userId:authenticatedUserId}).exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId
    const authenticatedUserId = req.session.userId;

    try {
        asserIsDefined(authenticatedUserId)

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }
        const note = await NoteModel.findById(noteId).exec()
        if (!note) {
            throw createHttpError(404, "Note not found")
        }

        if(!note.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot acces this note")
        }

        res.status(200).json(note)

    } catch (error) {
        next(error)

    }
}

interface CreateNoteBody {
    title?: string,
    text?: string
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text
    const authenticatedUserId = req.session.userId;

    try {
        asserIsDefined(authenticatedUserId)

        if (!title) {
            throw createHttpError(400, "Note most have title")
        }
        const newNote = await NoteModel.create({
            userId:authenticatedUserId,
            title,
            text
        })

        res.status(201).json(newNote)


    } catch (error) {
        next(error)


    }
}

interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId
    const newTitle = req.body.title
    const newtext = req.body.text
    const authenticatedUserId = req.session.userId;

    try {
        asserIsDefined(authenticatedUserId)

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }
        if (!newTitle) {
            throw createHttpError(400, "Note most have title")
        }
        const note = await NoteModel.findById(noteId).exec()
        if (!note) {
            throw createHttpError(404, "Note not found")
        }
        if(!note.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot acces this note")
        }
        note.title = newTitle
        note.text = newtext

        const updateNote = await note.save()

        res.status(200).json(updateNote)

    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId
    const authenticatedUserId = req.session.userId;


    try {
        asserIsDefined(authenticatedUserId)

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id")
        }
        const note = await NoteModel.findById(noteId).exec()

        if (!note) {
            throw createHttpError(404, "Note not found")
        }
        if(!note.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You cannot acces this note")
        }

        await note.deleteOne()
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}