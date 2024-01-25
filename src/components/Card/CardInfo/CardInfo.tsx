import { Modal } from '../../Modal/Modal'

import { CardInfoProps } from '../../../types'

import './CardInfo.css'
import { Calendar, CheckSquare, List, Tag, Trash, Type } from 'react-feather'
import { CustomInput } from '../../CustomInput/CustomInput'
import { Chip } from '../../Chip/Chip'
import { colorsList } from '../../../helpers/Utils'
import { useCardInfo } from '../../../hooks/useCardInfo'

export const CardInfo = (props: CardInfoProps) => {
  const { onClose } = props

  const {
    cardValues,
    calculatedPercent,
    updateTitle,
    updateDesc,
    updateDate,
    addLabel,
    removeLabel,
    addTask,
    removeTask,
    selectedColor,
    updateTask,
    setSelectedColor,
  } = useCardInfo(props)

  return (
    <Modal onClose={onClose}>
      <div className='cardinfo'>

        <div className='cardinfo-box'>

          <div className='cardinfo-box-title'>
            <Type />
            <p>Title</p>
          </div>

          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description</p>
          </div>
          <CustomInput
            defaultValue={cardValues.desc}
            text={cardValues.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>Date</p>
          </div>
          <input
            type="date"
            defaultValue={cardValues.date}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDate(event.target.value)}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo-box-labels">
            {cardValues.labels?.map((item, index) => (
              <Chip key={index} item={item} removeLabel={removeLabel} />
            ))}
          </div>
          <ul>
            {colorsList.map((item, index) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li-active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <CustomInput
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value: string) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Tasks</p>
          </div>
          <div className="cardinfo-box-progress-bar">
            <div
              className="cardinfo-box-progress"
              style={{
                width: `${calculatedPercent}%`,
                backgroundColor: calculatedPercent === 100 ? 'limegreen' : '',
              }}
            />
          </div>
          <div className="cardinfo-box-task-list">
            {cardValues.tasks?.map((item) => (
              <div key={item.id} className="cardinfo-box-task-checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <CustomInput
            text={"Add a Task"}
            placeholder="Enter task"
            onSubmit={addTask}
          />
        </div>
      </div>
    </Modal>
  )
}
