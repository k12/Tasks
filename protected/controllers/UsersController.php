<?php

class UsersController extends CController
{
    public function actionIndex()
    {
        $this->render('index');
    }

    public function actionRead()
    {
        try {
            if (isset($_GET['id'])) { //retrieve one user
                $user = Users::model()->findByPk($_GET['id']);
                $respond['users'] = $user->attributes;
            }
            else {
                $users = Users::model()->findAll(array(
                    'select'=>'*',
                    'order'=>'name ASC'
                ));

                foreach($users as $user) {
                    $respond['users'][] = $user->attributes;
                }
            }

            $respond['success'] = true;
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