<?php

class TasksController extends CController
{
    public function actionIndex()
    {
        $this->render('index');
    }

    public function actionRead()
    {
        try {
            $tasks = Tasks::model()->findAll(array(
                'select'=>'*',
                'order'=>'id DESC'
            ));

            $respond['success'] = true;

            foreach($tasks as $task) {
                $respond['tasks'][] = $task->attributes;
            }
        }
        catch (Exception $e) {
            $respond = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }

        echo json_encode($respond);
    }

    public function actionError()
    {
        if ($error = Yii::app()->errorHandler->error) {
            if (Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
        }
    }

}