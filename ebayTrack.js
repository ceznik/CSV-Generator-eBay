{
  "SetShipmentTrackingInfoRequest": {
    "-xmlns": "urn:ebay:apis:eBLBaseComponents",
    "IsPaid": " boolean ",
    "IsShipped": " boolean ",
    "OrderID": " string ",
    "OrderLineItemID": " string ",
    "Shipment": {
      "#text": " ShipmentType",
      "ShipmentTrackingDetails": {
        "#text": " ShipmentTrackingDetailsType",
        "ShipmentLineItem": {
          "#text": " ShipmentLineItemType ",
          "LineItem": {
            "#text": " LineItemType ",
            "CountryOfOrigin": " string ",
            "Description": " string ",
            "ItemID": " ItemIDType (string) ",
            "Quantity": " int ",
            "TransactionID": " string "
          }
        },
        "ShipmentTrackingNumber": " string ",
        "ShippingCarrierUsed": " string "
      },
      "ShippedTime": " dateTime "
    }
  }
}