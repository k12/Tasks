<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <title><?php echo CHtml::encode($this->pageTitle); ?></title>
    <link rel="stylesheet" type="text/css" href="http://cdn.sencha.io/ext-4.1.0-gpl/resources/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->baseUrl; ?>/public/css/style.css">

    <script type="text/javascript" src="http://cdn.sencha.io/ext-4.1.0-gpl/ext-all-debug.js"></script>
</head>

<body>
    <?php echo $content; ?>
</body>

</html>