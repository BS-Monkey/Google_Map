import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from "../../../styles/Home.module.css";
import { toast } from 'react-toastify'
import { Button, Container, Text } from "../../components/ui";
import { FormAddPeople } from '../../API'
import { useRouter } from 'next/router'
import intervals from '../../intervals.json';
import { capitalize } from '../../utils';

const AddPeople = () => {
  const [addItem, setAddItem] = useState<IPeoples>({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    province: '',
    postal_code: '',
    rank: '',
    person_id: 0,
    color_change_interval: 1
  })
  const [success, setSuccess] = useState<Boolean>(false)
  const [error, setError] = useState<Boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setAddItem({
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      province: '',
      postal_code: '',
      rank: '',
      person_id: 0, 
      color_change_interval: 1
    })
  }, [])
  
  const onAdd = () => {
    if (addItem.first_name &&
      addItem.last_name &&
      addItem.address &&
    addItem.city &&
    addItem.province &&
    addItem.postal_code &&
    addItem.rank  ) {
      FormAddPeople(addItem)
      .then( data => {
          console.log(data)
          setSuccess(true)
          toast('Person Added')
      })
      .catch( err => {
        console.log(err)
      })
    } else {
      setError(true)
    }

    console.log("handleAdd State: ")
  }

  const handleChange = (e: any) => {
    setAddItem({...addItem, [e.target.name]: e.target.value})
  }

  const onCancel = () => {
    router.push('/')
  }

  const onMain = () => {
    setSuccess(false)
    router.push('/people/tablepeople')
  }

  const onAgain = () => {
    setSuccess(false)
    setAddItem({
      first_name: '',
    last_name: '',
    address: '',
    city: '',
    province: '',
    postal_code: '',
    rank: '',
    person_id: 0,
    color_change_interval: 1
    })
  }

  return (
    <Container>
      <div className="flex justify-center pt-20">
        <div className="pb-10">
          <Text variant="pageHeading">Add Person</Text>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="border border-gray-200 rounded shadow-2xl p-10">
          <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className={styles.inputField}
                  id="rank"
                  name="rank"
                  placeholder="Rank"
                  type="text"
                  value={addItem.rank}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className={styles.inputField}
                  id="person_id"
                  name="person_id"
                  placeholder="Person Id"
                  type="number"
                  value={addItem.person_id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className={styles.inputField}
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  type="text"
                  value={addItem.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className={styles.inputField}
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  type="text"
                  value={addItem.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className={styles.inputField}
                  id="address"
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={addItem.address}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className={styles.inputField}
                  id="city"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={addItem.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <input
                  className={styles.inputField}
                  id="province"
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={addItem.province}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  className={styles.inputField}
                  id="postal_code"
                  type="text"
                  name="postal_code"
                  placeholder="Postal Code"
                  value={addItem.postal_code}
                  onChange={handleChange}
                />
              </div>
            </div>
          
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <select className={styles.inputField} id="color_change_interval" name="color_change_interval" value={addItem.color_change_interval} onChange={handleChange}>
                  <option selected disabled value={1}>Color Change Interval</option>
                  { intervals.map(interval => (
                    <option value={interval.seconds}>{capitalize(interval.label)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="pr-2">
                <Button
                  className={styles.ButtonField}
                  onClick={() => onAdd()}
                >
                  Add Data
                </Button>
              </div>
              <div>
                <Button
                  className={styles.ButtonField}
                 
                ><Link href='/people/tablepeople'>
                  Cancel

                  </Link>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default AddPeople