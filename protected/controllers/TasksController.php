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
                $user = Users::model()->findByPk($task['createdById']);
                $createdBy = $user->attributes;

                $user = Users::model()->findByPk($task['assignedById']);
                $assignedBy = $user->attributes;

                $user = Users::model()->findByPk($task['assignedToId']);
                $assignedTo = $user->attributes;

                $currentTask = $task->attributes;
                $currentTask['createdBy'] = $createdBy;
                $currentTask['assignedBy'] = $assignedBy;
                $currentTask['assignedTo'] = $assignedTo;

                $respond['tasks'][] = $currentTask;
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
            if (!$task) {
                throw new Exception('Specified task not found!');
            }

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

    public function actionDelete()
    {
        try {
            $params = $this->getParams();

            if (Tasks::model()->deleteByPk($params['id'])) {
                $respond = array(
                    'success' => true
                );
            }
            else {
                throw new Exception('Specified task not found!');
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
        $toNullMap = array('categoryId', 'assignedById', 'assignedToId'); //this fields should be converted from 0 to null values
        $params = json_decode(file_get_contents('php://input'), true);

        //FIXIT: ugly solution for types compatibility (how to set null value for extjs model's field which type is int?)
        foreach ($params as $k => $v)
        {
            if (in_array($k, $toNullMap) && empty($params[$k])) {
                $params[$k] = null;
            }
        }

        return $params;
    }

}