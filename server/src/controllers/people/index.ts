import { Response, Request } from "express"
import { IPerson } from "../../types/type"
import Person from "../../models/person"
import FormCallTest from "../../models/callFormTest"
import mongoose from 'mongoose';

const getPersons = async (req: Request, res: Response): Promise<void> => {
  try {
    const person: IPerson[] = await Person.find()
    res.status(200).json({ person })
  } catch (error) {
    throw error
  }
}

const getPersonById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ person: null });
    }

    const person = await Person.findById(id);

    return res.status(200).json({ person });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const addPeople = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IPerson,
      | "first_name"
      | "last_name"
      | "address"
      | "rank"
      | "city"
      | "province"
      | "postal_code"
      | "person_id"
      | "color_change_interval"
    >

    const person: IPerson = new Person({
      first_name: body.first_name,
      last_name: body.last_name,
      rank: body.rank,
      address: body.address,
      city: body.city,
      province: body.province,
      postal_code: body.postal_code,
      person_id: body.person_id,
      color_change_interval: body.color_change_interval,
    })

    const newPerson: IPerson = await person.save()

    res.status(200).json({ message: "Perosn added", person: newPerson })
  } catch (error) {
    throw error
  }
}

// const updatePoint = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const {
//       params: { id },
//       body,
//     } = req
//     const updatePoint: IPerson | null = await Point.findByIdAndUpdate(
//       { _id: id },
//       body
//     )
//     res.status(200).json({
//       message: "Point updated",
//       point: updatePoint,
//     })
//   } catch (error) {
//     throw error
//   }
// }

// const deletePoint = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deletePoint: IPerson | null = await Point.findByIdAndRemove(
//       req.params.id
//     )
//     res.status(200).json({
//       message: "Point deleted",
//       point: deletePoint,
//     })
//   } catch (error) {
//     throw error
//   }
// }

const addPeopleFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const addItems: IPerson[] = req.body

    addItems.map((body: IPerson) => {
      const data: IPerson = new Person({
        first_name: body.first_name,
        last_name: body.last_name,
        rank: body.rank,
        address: body.address,
        city: body.city,
        province: body.province,
        postal_code: body.postal_code,
        person_id: body.person_id,
        color_change_interval: body.color_change_interval
      })

      let state = saveData(data)
      // const newItem: IItem = await data.save()
      if (!state) res.status(200).json({ message: "addFile failed" })
    })
    res.status(200).json({ message: "addFile success" })
  } catch (error) {
    throw error
  }
}

const saveData = async (data: IPerson) => {
  const newItem: IPerson = await data.save()
  if (newItem) return true
}

// const peopleCount = async (req: Request, res: Response): Promise<void> => {

//   try {

//     const person = await Person.estimatedDocumentCount()

//     console.log(person)

//     const query = { person_name:'Hospiltal'}

//     const personName = await Person.countDocuments(query)

//     console.log(personName)
//   } catch (error) {

//   }
// }

// const peopleCount = async (req: Request, res: Response): Promise<void> => {

//   try {

//     const person = await FormCallTest.estimatedDocumentCount()

//     const otherperson = await Person.estimatedDocumentCount()

//     console.log(person + otherperson )

//     const query = { textValue:'qqq'}

//     const personName = await FormCallTest.countDocuments(query)

//     console.log(personName)

//     const newName = await Person.estimatedDocumentCount()
//     console.log(newName)

// // const query = {person_name:'Hospiltal'}

// // const nameNew = await Person.countDocuments(query)

// // console.log(nameNew)

//   } catch (error) {

//   }
// }

const peopleCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const counter = await FormCallTest.estimatedDocumentCount()
    res.status(200).json(counter)
    console.log(counter)
  } catch (error) {}
}

export { getPersons, addPeople, addPeopleFile, peopleCount, getPersonById }
