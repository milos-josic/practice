const vpc = new Vpc(this, "TestVPC", {
      maxAzs: 2,
      natGateways: 0,
      gatewayEndpoints: {
        S3: {
          service: GatewayVpcEndpointAwsService.S3
        },
        DynamoDbEndpoint: {
          service: GatewayVpcEndpointAwsService.DYNAMODB
        }
      }
    });
 
    vpc.addInterfaceEndpoint('TestVPCECREndpoint', {
      service: InterfaceVpcEndpointAwsService.ECR,
      subnets: {
        subnetType: SubnetType.PUBLIC
      }
    });
 
    const cluster = new Cluster(this, "TestCluster", {
      vpc: vpc,
      enableFargateCapacityProviders: true
    });
