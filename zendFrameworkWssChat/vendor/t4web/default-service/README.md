# DefaultService
ZF2 Module for creating invokables services and with factory.

## Installation

Add this project in your composer.json:

```json
"require": {
  "t4web/default-service": "~0.1.0"
}
```

Now tell composer to download `T4web\DefaultService` by running the command:

```bash
$ php composer.phar update
```

#### Post installation

Enabling it in your `application.config.php`file.

```php
<?php
return array(
  'modules' => array(
      // ...
      'T4web\DefaultService',
  ),
  // ...
);
```

## Problem

1. To much invokables entries:
```php
'invokables' => [
    CreateAction\ChangesValidator::class => CreateAction\ChangesValidator::class,
    API\AddFriend\ViewModel::class => API\AddFriend\ViewModel::class,
    API\RemoveFriend\ViewModel::class => API\RemoveFriend\ViewModel::class,
    API\CreateFriendRequest\ViewModel::class => API\CreateFriendRequest\ViewModel::class,
    API\UpdateFriendRequest\ViewModel::class => API\UpdateFriendRequest\ViewModel::class,
    // ...
],
```

this no sense.

2. To much factory entries:
```php
'factories' => [
    Domain\User\MySelf::class => Domain\User\MySelfFactory::class,
    Domain\User\Service\Creator::class => Domain\User\Service\CreatorFactory::class,
    Domain\User\Service\Updater::class => Domain\User\Service\UpdaterFactory::class,
    API\AddFriend\ChangesValidator::class => API\AddFriend\ChangesValidatorFactory::class,
    API\RemoveFriend\CriteriaValidator::class => API\RemoveFriend\CriteriaValidatorFactory::class,
    API\RemoveFriend\RemoveService::class => API\RemoveFriend\RemoveServiceFactory::class,
    API\CreateFriendRequest\CriteriaValidator::class => API\CreateFriendRequest\CriteriaValidatorFactory::class,
    API\CreateFriendRequest\Service::class => API\CreateFriendRequest\ServiceFactory::class,
    API\UpdateFriendRequest\CriteriaValidator::class => API\UpdateFriendRequest\CriteriaValidatorFactory::class,
    API\UpdateFriendRequest\Service::class => API\UpdateFriendRequest\ServiceFactory::class,
    Frontend\ShowUser\ViewModel::class => Frontend\ShowUser\ViewModelFactory::class,
    Frontend\Friends\Service::class => Frontend\Friends\ServiceFactory::class,
    Frontend\Friends\ViewModel::class => Frontend\Friends\ViewModelFactory::class,
    Backend\LoginAs\Service::class => Backend\LoginAs\ServiceFactory::class,
    Friend\Listener\FriendRequestAccept::class => Friend\Listener\FriendRequestAcceptFactory::class,
],
```
if your Factory naming have rules (`ServiceClassName` + `Factory` word) - no sense in that config.

## Solution

Add `DefaultService` module in your project. In box we have only one abstract factory: `DefaultServiceAbstractFactory` - it very
simply. If Service has Factory (`ServiceClassName` + `Factory` word) - service will created by factory. If service not have
factory, but class exists - service will created by constructor.