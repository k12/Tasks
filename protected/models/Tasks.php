<?php

/**
 * This is the model class for table "tasks".
 *
 * The followings are the available columns in table 'tasks':
 * @property integer $id
 * @property string $title
 * @property string $dueDate
 * @property string $priority
 * @property string $note
 * @property integer $done
 * @property integer $assignedToId
 * @property integer $assignedById
 * @property integer $categoryId
 *
 * The followings are the available model relations:
 * @property Categories $category
 * @property Users $assignedTo
 * @property Users $assignedBy
 */
class Tasks extends CActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'tasks';
    }

    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('title', 'required'),
            array('done, assignedToId, assignedById, categoryId', 'numerical', 'integerOnly' => true),
            array('title', 'length', 'max' => 255),
            array('priority', 'length', 'max' => 64),
            array('dueDate, note', 'safe'),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id, title, dueDate, priority, note, done, assignedToId, assignedById, categoryId', 'safe', 'on' => 'search'),
        );
    }

    public function relations()
    {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'category' => array(self::BELONGS_TO, 'Categories', 'categoryId'),
            'assignedTo' => array(self::BELONGS_TO, 'Users', 'assignedToId'),
            'assignedBy' => array(self::BELONGS_TO, 'Users', 'assignedById'),
        );
    }

    public function attributeLabels()
    {
        return array(
            'id' => 'ID',
            'title' => 'Title',
            'dueDate' => 'Due Date',
            'priority' => 'Priority',
            'note' => 'Note',
            'done' => 'Done',
            'assignedToId' => 'Assigned To',
            'assignedById' => 'Assigned By',
            'categoryId' => 'Category',
        );
    }

    public function search()
    {
        // Warning: Please modify the following code to remove attributes that
        // should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id);
        $criteria->compare('title', $this->title, true);
        $criteria->compare('dueDate', $this->dueDate, true);
        $criteria->compare('priority', $this->priority, true);
        $criteria->compare('note', $this->note, true);
        $criteria->compare('done', $this->done);
        $criteria->compare('assignedToId', $this->assignedToId);
        $criteria->compare('assignedById', $this->assignedById);
        $criteria->compare('categoryId', $this->categoryId);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }

    //FIXIT: ugly solution for variable types compatibility between exts and yii
    public function onBeforeValidate($event)
    {
        $this->done = (int)$this->done;
    }

    public function onAfterValidate($event)
    {
        $this->done = (boolean)$this->done;
    }
}