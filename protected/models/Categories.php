<?php

/**
 * This is the model class for table "categories".
 *
 * The followings are the available columns in table 'categories':
 * @property integer $id
 * @property string $category
 * @property integer $editable
 *
 * The followings are the available model relations:
 * @property Tasks[] $tasks
 */
class Categories extends CActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'categories';
    }

    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('category', 'required'),
            array('editable', 'numerical', 'integerOnly' => true),
            array('category', 'length', 'max' => 255),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id, category, editable', 'safe', 'on' => 'search'),
        );
    }

    public function relations()
    {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
            'tasks' => array(self::HAS_MANY, 'Tasks', 'categoryId'),
        );
    }

    public function attributeLabels()
    {
        return array(
            'id' => 'ID',
            'category' => 'Category',
            'editable' => 'Editable',
        );
    }

    public function search()
    {
        // Warning: Please modify the following code to remove attributes that
        // should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id);
        $criteria->compare('category', $this->category, true);
        $criteria->compare('editable', $this->editable);

        return new CActiveDataProvider($this, array(
            'criteria' => $criteria,
        ));
    }
}