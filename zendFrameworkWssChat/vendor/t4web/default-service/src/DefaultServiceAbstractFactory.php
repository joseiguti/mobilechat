<?php

namespace T4web\DefaultService;

use Zend\ServiceManager\AbstractFactoryInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class DefaultServiceAbstractFactory implements AbstractFactoryInterface
{
    public function canCreateServiceWithName(ServiceLocatorInterface $serviceManager, $name, $requestedName)
    {
        if (!is_string($requestedName)) {
            return false;
        }

        $factoryName = $requestedName . "Factory";
        if (class_exists($factoryName)) {
            return true;
        }

        return class_exists($requestedName);
    }

    public function createServiceWithName(ServiceLocatorInterface $serviceManager, $name, $requestedName)
    {
        $factoryName = $requestedName . "Factory";
        if (class_exists($factoryName)) {
            $factory = new $factoryName();

            return $factory->createService($serviceManager);
        }

        return new $requestedName();
    }
}
