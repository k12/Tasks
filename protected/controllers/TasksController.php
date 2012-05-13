<?php

class TasksController extends CController
{
    public function actionIndex()
    {
        $this->render('index');
    }

    public function actionCreate()
    {
        try {
            $params = $this->getParams();

            $task = new Tasks;
            $task->attributes = $params;

            if($task->save()) {
                $respond = array(
                    'success' => true,
                    'tasks' => $task->attributes
                );
            }
            else {
                throw new Exception('Saving task failed!');
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

    public function actionUpdate()
    {
        try {
            $params = $this->getParams();

            $task = Tasks::model()->findByPk($params['id']);
            $task->attributes = $params;

            if($task->save()) {
                $respond = array(
                    'success' => true,
                    'tasks' => $task->attributes
                );
            }
            else {
                throw new Exception('Updating task failed!');
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

    private function getParams()
    {
        $data = file_get_contents('php://input');
        return json_decode($data, true);
    }

}