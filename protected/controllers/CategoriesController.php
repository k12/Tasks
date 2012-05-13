<?php

class CategoriesController extends CController
{
    public function actionIndex()
    {
        $this->render('index');
    }

    public function actionRead()
    {
        try {
            $categories = Categories::model()->findAll(array(
                'select'=>'*',
                'order'=>'category ASC'
            ));

            $respond['success'] = true;

            foreach($categories as $category) {
                $respond['categories'][] = $category->attributes;
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